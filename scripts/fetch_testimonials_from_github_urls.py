#!/usr/bin/env python3
"""
Script para obtener testimonios de GitHub a partir de una lista de URLs.
Este script lee una lista de URLs de GitHub y genera un archivo JSON
con la información básica (autor, texto, fecha y URL).
"""

import os
import json
import re
import requests
import time
from datetime import datetime
from dotenv import load_dotenv

# Cargar variables de entorno desde .env
load_dotenv()

# Configuración
INPUT_FILE = "scripts/testimonial_urls.txt"
OUTPUT_FILE = "src/data/testimonials.json"
GITHUB_TOKEN = os.environ.get("PUBLIC_GITHUB_TOKEN")

# Headers para la API de GitHub
HEADERS = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github.v3+json"
}

def parse_github_url(url):
    """Analiza una URL de GitHub para extraer información relevante."""
    # Patrones para diferentes tipos de URLs
    pr_comment_pattern = r"https://github\.com/([^/]+)/([^/]+)/pull/(\d+)#issuecomment-(\d+)"
    issue_comment_pattern = r"https://github\.com/([^/]+)/([^/]+)/issues/(\d+)#issuecomment-(\d+)"
    pr_review_pattern = r"https://github\.com/([^/]+)/([^/]+)/pull/(\d+)#pullrequestreview-(\d+)"
    discussion_comment_pattern = r"https://github\.com/([^/]+)/([^/]+)/discussions/(\d+)#discussioncomment-(\d+)"

    # Intentar coincidir con cada patrón
    match = re.match(pr_comment_pattern, url)
    if match:
        owner, repo, pr_number, comment_id = match.groups()
        return {
            "type": "pr_comment",
            "owner": owner,
            "repo": repo,
            "number": pr_number,
            "comment_id": comment_id
        }

    match = re.match(issue_comment_pattern, url)
    if match:
        owner, repo, issue_number, comment_id = match.groups()
        return {
            "type": "issue_comment",
            "owner": owner,
            "repo": repo,
            "number": issue_number,
            "comment_id": comment_id
        }

    match = re.match(pr_review_pattern, url)
    if match:
        owner, repo, pr_number, review_id = match.groups()
        return {
            "type": "pr_review",
            "owner": owner,
            "repo": repo,
            "number": pr_number,
            "review_id": review_id
        }

    match = re.match(discussion_comment_pattern, url)
    if match:
        owner, repo, discussion_number, comment_id = match.groups()
        return {
            "type": "discussion_comment",
            "owner": owner,
            "repo": repo,
            "number": discussion_number,
            "comment_id": comment_id
        }

    return None

def get_comment_data(url_info):
    """Obtiene los datos de un comentario de GitHub."""
    try:
        if url_info["type"] == "pr_comment" or url_info["type"] == "issue_comment":
            # Para comentarios en PRs e issues
            api_url = f"https://api.github.com/repos/{url_info['owner']}/{url_info['repo']}/issues/comments/{url_info['comment_id']}"
            response = requests.get(api_url, headers=HEADERS, timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                if data and "user" in data and data["user"]:
                    return {
                        "author": data["user"]["login"],
                        "avatar": data["user"]["avatar_url"],
                        "date": data["created_at"],
                        "text": data["body"],
                        "url": data["html_url"]
                    }
                else:
                    print(f"  Error: Datos incompletos en la respuesta de la API")
                    return None
            else:
                print(f"  Error: API devolvió código {response.status_code}: {response.text}")
                return None

        elif url_info["type"] == "pr_review":
            # Para reviews de PRs
            api_url = f"https://api.github.com/repos/{url_info['owner']}/{url_info['repo']}/pulls/{url_info['number']}/reviews/{url_info['review_id']}"
            response = requests.get(api_url, headers=HEADERS, timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                if data and "user" in data and data["user"]:
                    return {
                        "author": data["user"]["login"],
                        "avatar": data["user"]["avatar_url"],
                        "date": data["submitted_at"],
                        "text": data["body"] or "LGTM 👍", # A veces los reviews aprobados no tienen texto
                        "url": f"https://github.com/{url_info['owner']}/{url_info['repo']}/pull/{url_info['number']}#pullrequestreview-{url_info['review_id']}"
                    }
                else:
                    print(f"  Error: Datos incompletos en la respuesta de la API")
                    return None
            else:
                print(f"  Error: API devolvió código {response.status_code}: {response.text}")
                return None

    except requests.exceptions.RequestException as e:
        print(f"  Error de red: {e}")
        return None
    except KeyError as e:
        print(f"  Error: Campo faltante en los datos: {e}")
        return None
    except Exception as e:
        print(f"  Error inesperado: {e}")
        return None

    # Si llegamos aquí, tipo no reconocido
    print(f"  Error: Tipo de URL no reconocido: {url_info.get('type', 'unknown')}")
    return None

def format_date(date_str):
    """Formatea una fecha ISO a un formato más legible."""
    try:
        date_obj = datetime.fromisoformat(date_str.replace("Z", "+00:00"))
        return date_obj.strftime("%b %Y")
    except (ValueError, TypeError):
        return date_str

def main():
    """Función principal."""
    print("\n===== GitHub Testimonial Fetcher =====")
    print(f"Input file: {INPUT_FILE}")
    print(f"Output file: {OUTPUT_FILE}")
    print("=====================================\n")

    if not GITHUB_TOKEN:
        print("Error: No se encontró el token de GitHub. Asegúrate de tener un archivo .env con PUBLIC_GITHUB_TOKEN.")
        return

    # Leer las URLs del archivo de entrada
    urls = []
    try:
        with open(INPUT_FILE, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#'):
                    urls.append(line)
    except FileNotFoundError:
        print(f"Error: No se encontró el archivo {INPUT_FILE}")
        return

    print(f"Encontradas {len(urls)} URLs para procesar")

    # Procesar cada URL
    testimonials_by_repo = {}
    for url in urls:
        print(f"Procesando: {url}")
        url_info = parse_github_url(url)
        if not url_info:
            print(f"  Error: No se pudo analizar la URL: {url}")
            continue

        comment_data = get_comment_data(url_info)
        if not comment_data:
            print(f"  Error: No se pudieron obtener los datos del comentario")
            continue

        # Formatear la fecha
        original_date = comment_data["date"]
        comment_data["date"] = format_date(comment_data["date"])

        # Guardar la fecha original para ordenar
        try:
            # Intentar usar la fecha original primero
            if original_date:
                date_obj = datetime.fromisoformat(original_date.replace("Z", "+00:00"))
                comment_data["date_for_sorting"] = date_obj.timestamp()
            else:
                comment_data["date_for_sorting"] = datetime.now().timestamp()
        except (ValueError, TypeError) as e:
            print(f"  Advertencia: Error al convertir fecha '{original_date}': {e}")
            # Si hay un error al convertir la fecha, usar la fecha actual
            comment_data["date_for_sorting"] = datetime.now().timestamp()

        # Crear un objeto simplificado con solo la información necesaria
        simple_data = {
            "text": comment_data["text"],
            "author": comment_data["author"],
            "date": comment_data["date"],
            "url": comment_data["url"],
            "date_for_sorting": comment_data["date_for_sorting"]
        }

        # Agrupar por repositorio
        repo_key = f"{url_info['owner']}/{url_info['repo']}"
        if repo_key not in testimonials_by_repo:
            testimonials_by_repo[repo_key] = []

        testimonials_by_repo[repo_key].append(simple_data)
        print(f"  Éxito: {comment_data['author']} - {comment_data['date']}")
        
        # Pequeña pausa para evitar rate limiting
        time.sleep(0.5)

    # Ordenar testimonios por fecha (más recientes primero) dentro de cada repositorio
    for repo in testimonials_by_repo:
        testimonials_by_repo[repo].sort(key=lambda x: x["date_for_sorting"], reverse=True)
        # Eliminar el campo de ordenación que ya no necesitamos
        for item in testimonials_by_repo[repo]:
            del item["date_for_sorting"]

    # Crear el resultado final
    result = {
        "generated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "repositories": []
    }

    # Convertir el diccionario a una lista de repositorios
    for repo_name, testimonials in testimonials_by_repo.items():
        result["repositories"].append({
            "repo": repo_name,
            "testimonials": testimonials
        })

    # Ordenar repositorios alfabéticamente
    result["repositories"].sort(key=lambda x: x["repo"])

    # Guardar los testimonios en el archivo de salida
    if result["repositories"]:
        # Crear el directorio si no existe
        os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)

        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            json.dump(result, f, indent=2, ensure_ascii=False)

        total_testimonials = sum(len(repo["testimonials"]) for repo in result["repositories"])
        print(f"\nGuardados {total_testimonials} testimonios de {len(result['repositories'])} repositorios en {OUTPUT_FILE}")
    else:
        print("\nNo se encontraron testimonios válidos para guardar")

if __name__ == "__main__":
    main()
