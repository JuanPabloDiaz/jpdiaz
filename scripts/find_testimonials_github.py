#!/usr/bin/env python3
"""
GitHub Testimonial Finder

This script scans a GitHub repository for comments in PRs, issues, and discussions
from users other than the repository owner. It focuses on merged PRs and can
export the results to a JSON file for use in testimonials.
"""

import argparse
import json
import os
import requests
import sys
import time
from datetime import datetime
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env file
dotenv_path = Path(__file__).resolve().parent.parent / '.env'
load_dotenv(dotenv_path)

# ============= CONFIGURATION =============
# Modify these values directly or they will be loaded from .env file

# GitHub repository details
REPO_OWNER = "JuanPabloDiaz"  # Your GitHub username or organization
REPO_NAME = "jpdiaz"          # Your repository name
EXCLUDE_USER = "JuanPabloDiaz" # Your GitHub username to exclude your own comments

# Output settings
OUTPUT_FILE = "src/content/testimonials_auto.json"  # Where to save the results
MIN_WORDS = 1    # Minimum words for a testimonial
MAX_WORDS = 500   # Maximum words (None for no limit)

# API settings
MAX_PRS_PER_REPO = 30  # Maximum number of PRs to process per repository
MAX_ISSUES_PER_REPO = 30  # Maximum number of issues to process per repository
MAX_DISCUSSIONS_PER_REPO = 30  # Maximum number of discussions to process per repository
SLEEP_BETWEEN_REQUESTS = 0.2  # Sleep time between API requests to avoid rate limiting

# What to scan
SCAN_PRS = True
SCAN_ISSUES = True
SCAN_DISCUSSIONS = True
SCAN_MAIN_REPO = False  # Set to False to skip your own repository
SCAN_EXTERNAL_REPOS = True  # Set to True to scan external repositories

# Filter settings
# List of bot usernames to exclude (common GitHub bots)
BOT_USERS = [
    "github-actions[bot]", 
    "dependabot[bot]", 
    "renovate[bot]", 
    "netlify[bot]", 
    "vercel[bot]", 
    "coderabbitai[bot]",
    "codecov[bot]",
    "stale[bot]",
    "github-actions",
    "dependabot",
    "renovate",
    "netlify",
    "vercel",
    "coderabbitai",
    "codecov",
    "stale",
    "copilot",
    "github-learning-lab[bot]",
    "github-learning-lab",
    "sonarcloud[bot]",
    "sonarcloud"
]

EXTERNAL_REPOS = [
    {"owner": "tech-conferences", "repo": "conference-data"},
    # {"owner": "withastro", "repo": "docs"},
    # {"owner": "rupali-codes", "repo": "LinksHub"},
    # {"owner": "marcelscruz", "repo": "dev-resources"},
    # {"owner": "Mteheran", "repo": "api-colombia"},
    # {"owner": "unitycatalog", "repo": "unitycatalog"},
    # {"owner": "unitycatalog", "repo": "unitycatalog-ui"} # Done 
]

GITHUB_TOKEN = os.environ.get("PUBLIC_GITHUB_TOKEN")

HEADERS = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github+json"
}

def get_merged_prs():
    """Fetch merged pull requests from the repository."""
    print(f"Fetching merged PRs from {REPO_OWNER}/{REPO_NAME}...")
    url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/pulls"
    params = {"state": "closed", "per_page": 30}
    prs = []
    page = 1
    
    while url and len(prs) < MAX_PRS_PER_REPO:
        try:
            # Sleep to avoid rate limiting
            time.sleep(SLEEP_BETWEEN_REQUESTS)
            
            res = requests.get(url, headers=HEADERS, params=params)
            
            # Check for rate limiting
            if res.status_code == 403 and "X-RateLimit-Remaining" in res.headers and int(res.headers["X-RateLimit-Remaining"]) == 0:
                reset_time = int(res.headers["X-RateLimit-Reset"])
                wait_time = reset_time - int(time.time()) + 5  # Add 5 seconds buffer
                if wait_time > 0:
                    print(f"Rate limit exceeded. Waiting for {wait_time} seconds...")
                    time.sleep(min(wait_time, 60))  # Wait at most 60 seconds
                    continue
            
            res.raise_for_status()
            data = res.json()
            
            for pr in data:
                if pr.get("merged_at"):
                    prs.append({
                        "number": pr["number"],
                        "title": pr["title"],
                        "merged_at": pr["merged_at"],
                        "html_url": pr["html_url"]
                    })
                    
                    # Stop if we've reached the limit
                    if len(prs) >= MAX_PRS_PER_REPO:
                        print(f"Reached limit of {MAX_PRS_PER_REPO} PRs")
                        break
            
            # Handle pagination
            if "next" in res.links and len(prs) < MAX_PRS_PER_REPO:
                url = res.links["next"]["url"]
                page += 1
            else:
                url = None
                
        except requests.exceptions.RequestException as e:
            print(f"Error fetching PRs: {e}")
            break
    
    print(f"Found {len(prs)} merged PRs")
    return prs

def get_comments_from_pr(pr_number, pr_url, pr_title):
    """Fetch comments from a specific PR, excluding comments from EXCLUDE_USER."""
    # Fetch both review comments and regular PR comments
    comments_url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/issues/{pr_number}/comments"
    review_comments_url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/pulls/{pr_number}/comments"
    all_comments = []

    for url_type, url in [("issue_comments", comments_url), ("review_comments", review_comments_url)]:
        try:
            # Sleep to avoid rate limiting
            time.sleep(SLEEP_BETWEEN_REQUESTS)
            
            res = requests.get(url, headers=HEADERS)
            
            # Check for rate limiting
            if res.status_code == 403 and "X-RateLimit-Remaining" in res.headers and int(res.headers["X-RateLimit-Remaining"]) == 0:
                reset_time = int(res.headers["X-RateLimit-Reset"])
                wait_time = reset_time - int(time.time()) + 5  # Add 5 seconds buffer
                if wait_time > 0:
                    print(f"Rate limit exceeded. Waiting for {wait_time} seconds...")
                    time.sleep(min(wait_time, 60))  # Wait at most 60 seconds
                    continue
            
            res.raise_for_status()
            comments = res.json()
            
            for comment in comments:
                if comment["user"]["login"].lower() != EXCLUDE_USER.lower():
                    all_comments.append({
                        "user": comment["user"]["login"],
                        "avatar_url": comment["user"]["avatar_url"],
                        "created_at": comment["created_at"],
                        "body": comment["body"],
                        "url": comment["html_url"],
                        "source": f"PR #{pr_number}: {pr_title}",
                        "source_url": pr_url,
                        "type": "pull_request"
                    })
        except requests.exceptions.RequestException as e:
            print(f"Error fetching comments for PR #{pr_number}: {e}")
    
    return all_comments

def get_issues():
    """Fetch all issues from the repository."""
    print(f"Fetching issues from {REPO_OWNER}/{REPO_NAME}...")
    url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/issues"
    params = {"state": "all", "per_page": 100}
    issues = []
    page = 1
    
    while url:
        try:
            res = requests.get(url, headers=HEADERS, params=params)
            res.raise_for_status()
            data = res.json()
            
            for issue in data:
                # Skip pull requests (they appear in the issues API)
                if "pull_request" not in issue:
                    issues.append({
                        "number": issue["number"],
                        "title": issue["title"],
                        "created_at": issue["created_at"],
                        "html_url": issue["html_url"],
                        "state": issue["state"]
                    })
            
            # Handle pagination
            if "next" in res.links:
                url = res.links["next"]["url"]
                page += 1
            else:
                url = None
                
        except requests.exceptions.RequestException as e:
            print(f"Error fetching issues: {e}")
            break
    
    print(f"Found {len(issues)} issues")
    return issues

def get_comments_from_issue(issue_number, issue_url, issue_title):
    """Fetch comments from a specific issue, excluding comments from EXCLUDE_USER."""
    comments_url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/issues/{issue_number}/comments"
    all_comments = []

    try:
        res = requests.get(comments_url, headers=HEADERS)
        res.raise_for_status()
        comments = res.json()
        
        for comment in comments:
            if comment["user"]["login"].lower() != EXCLUDE_USER.lower():
                all_comments.append({
                    "user": comment["user"]["login"],
                    "avatar_url": comment["user"]["avatar_url"],
                    "created_at": comment["created_at"],
                    "body": comment["body"],
                    "url": comment["html_url"],
                    "source": f"Issue #{issue_number}: {issue_title}",
                    "source_url": issue_url,
                    "type": "issue"
                })
    except requests.exceptions.RequestException as e:
        print(f"Error fetching comments for issue #{issue_number}: {e}")
    
    return all_comments

def get_discussions():
    """Fetch all discussions from the repository using the GraphQL API."""
    print(f"Fetching discussions from {REPO_OWNER}/{REPO_NAME}...")
    url = "https://api.github.com/graphql"
    discussions = []
    has_next_page = True
    cursor = None
    
    while has_next_page:
        cursor_query = f', after: "{cursor}"' if cursor else ""
        query = """
        {
          repository(owner: "%s", name: "%s") {
            discussions(first: 100%s) {
              pageInfo {
                hasNextPage
                endCursor
              }
              nodes {
                number
                title
                url
                createdAt
              }
            }
          }
        }
        """ % (REPO_OWNER, REPO_NAME, cursor_query)
        
        try:
            res = requests.post(url, headers=HEADERS, json={"query": query})
            res.raise_for_status()
            data = res.json()
            
            if "errors" in data:
                print(f"GraphQL errors: {data['errors']}")
                break
                
            discussions_data = data["data"]["repository"]["discussions"]
            page_info = discussions_data["pageInfo"]
            
            for discussion in discussions_data["nodes"]:
                discussions.append({
                    "number": discussion["number"],
                    "title": discussion["title"],
                    "created_at": discussion["createdAt"],
                    "html_url": discussion["url"]
                })
            
            has_next_page = page_info["hasNextPage"]
            cursor = page_info["endCursor"] if has_next_page else None
            
        except requests.exceptions.RequestException as e:
            print(f"Error fetching discussions: {e}")
            break
        except KeyError as e:
            print(f"Unexpected response structure: {e}")
            break
    
    print(f"Found {len(discussions)} discussions")
    return discussions

def get_comments_from_discussion(discussion_number, discussion_url, discussion_title):
    """Fetch comments from a specific discussion using the GraphQL API."""
    url = "https://api.github.com/graphql"
    all_comments = []
    has_next_page = True
    cursor = None
    
    while has_next_page:
        cursor_query = f', after: "{cursor}"' if cursor else ""
        query = """
        {
          repository(owner: "%s", name: "%s") {
            discussion(number: %d) {
              comments(first: 100%s) {
                pageInfo {
                  hasNextPage
                  endCursor
                }
                nodes {
                  author {
                    login
                    avatarUrl
                  }
                  createdAt
                  body
                  url
                }
              }
            }
          }
        }
        """ % (REPO_OWNER, REPO_NAME, discussion_number, cursor_query)
        
        try:
            res = requests.post(url, headers=HEADERS, json={"query": query})
            res.raise_for_status()
            data = res.json()
            
            if "errors" in data:
                print(f"GraphQL errors: {data['errors']}")
                break
                
            comments_data = data["data"]["repository"]["discussion"]["comments"]
            page_info = comments_data["pageInfo"]
            
            for comment in comments_data["nodes"]:
                if comment["author"] and comment["author"]["login"].lower() != EXCLUDE_USER.lower():
                    all_comments.append({
                        "user": comment["author"]["login"],
                        "avatar_url": comment["author"]["avatarUrl"],
                        "created_at": comment["createdAt"],
                        "body": comment["body"],
                        "url": comment["url"],
                        "source": f"Discussion: {discussion_title}",
                        "source_url": discussion_url,
                        "type": "discussion"
                    })
            
            has_next_page = page_info["hasNextPage"]
            cursor = page_info["endCursor"] if has_next_page else None
            
        except requests.exceptions.RequestException as e:
            print(f"Error fetching comments for discussion #{discussion_number}: {e}")
            break
        except KeyError as e:
            print(f"Unexpected response structure: {e}")
            break
    
    return all_comments

def filter_testimonials(testimonials, min_words=10, max_words=None):
    """Filter testimonials based on word count and other criteria."""
    filtered = []
    skipped_short = 0
    skipped_long = 0
    skipped_code = 0
    skipped_simple = 0
    skipped_bots = 0
    skipped_markdown = 0
    skipped_negative = 0
    
    # Phrases that indicate rejection or negative comments
    rejection_phrases = [
        "we'll close this pr",
        "we don't think it's developer related", 
        "sorry",
        "but we'll close",
        "not a good fit",
        "doesn't fit",
        "not appropriate",
        "not relevant",
        "not related",
        "rejected",
        "closing this",
        "Thanks a lot for the contribution. But we'll close this PR as we don't think it's developer related. Please feel free to contact to us if you have any questions. Sorry."
    ]
    
    for testimonial in testimonials:
        # Skip bot users
        if testimonial["user"].lower() in [bot.lower() for bot in BOT_USERS] or testimonial["user"].endswith("[bot]"):
            skipped_bots += 1
            continue
            
        word_count = len(testimonial["body"].split())
        
        # Skip testimonials that are too short (but keep simple thank you messages)
        body_lower = testimonial["body"].strip().lower()
        
        # Skip rejection or negative comments
        if any(phrase in body_lower for phrase in rejection_phrases):
            skipped_negative += 1
            continue
            
        contains_thank = any(thank in body_lower for thank in ["thank", "thanks", "thx", "gracias", "👏", "👍", "lgtm"])
        contains_name = "juanpablodiaz" in body_lower.replace(" ", "") or "juan" in body_lower
        
        # Keep simple thank you messages that mention you
        if contains_thank and contains_name:
            # This is a valuable testimonial - keep it regardless of length
            pass
        elif word_count < min_words:
            skipped_short += 1
            continue
            
        # Skip testimonials that are too long (if max_words is specified)
        if max_words and word_count > max_words:
            skipped_long += 1
            continue
            
        # Skip testimonials that are just code blocks or links
        if testimonial["body"].strip().startswith("```") and testimonial["body"].strip().endswith("```"):
            skipped_code += 1
            continue
            
        # Skip testimonials that are likely just markdown formatting or HTML
        body = testimonial["body"].strip()
        if (body.startswith("<!--") or 
            (body.startswith("<") and body.endswith(">") and not "<img" in body) or
            body.count("|") > 5 or  # Likely a table
            body.count("[vc]:") > 0 or  # Vercel bot format
            body.count("```") > 3):  # Too many code blocks
            skipped_markdown += 1
            continue
            
        filtered.append(testimonial)
    
    total_skipped = skipped_short + skipped_long + skipped_code + skipped_simple + skipped_bots + skipped_markdown + skipped_negative
    print(f"Filtered out {total_skipped} comments:")
    print(f"  - {skipped_bots} from bots")
    print(f"  - {skipped_negative} negative or rejection comments")
    print(f"  - {skipped_short} too short (< {min_words} words)")
    print(f"  - {skipped_long} too long (> {max_words} words)" if max_words else "")
    print(f"  - {skipped_code} code blocks")
    print(f"  - {skipped_simple} simple responses (LGTM, thanks, etc.)")
    print(f"  - {skipped_markdown} markdown/HTML formatting")
    return filtered

def save_to_json(testimonials, output_file):
    """Save testimonials to a JSON file."""
    # Format for testimonials.json
    formatted_testimonials = []
    for testimonial in testimonials:
        # Format date (assuming ISO format from GitHub API)
        date_str = testimonial["created_at"]
        try:
            date_obj = datetime.fromisoformat(date_str.replace("Z", "+00:00"))
            formatted_date = date_obj.strftime("%b %Y")
        except (ValueError, TypeError):
            formatted_date = date_str
        
        # Extract repository owner and name from source_url
        source_url = testimonial["source_url"]
        repo_parts = source_url.split("/")
        if len(repo_parts) >= 5:
            repo_owner = repo_parts[3]
            repo_name = repo_parts[4]
        else:
            repo_owner = "unknown"
            repo_name = "unknown"
            
        formatted_testimonial = {
            "author": testimonial["user"],
            "avatar": testimonial["avatar_url"],
            "date": formatted_date,
            "text": testimonial["body"],
            "source": testimonial["source"],
            "source_url": testimonial["source_url"],
            "comment_url": testimonial["url"],
            "repository": {
                "owner": repo_owner,
                "name": repo_name,
                "full_name": f"{repo_owner}/{repo_name}"
            }
        }
        formatted_testimonials.append(formatted_testimonial)

    # Create directory if it doesn't exist
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    
    # Añadir un comentario con la marca de tiempo para verificar que se actualiza
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    formatted_testimonials.insert(0, {
        "author": "TIMESTAMP",
        "avatar": "https://avatars.githubusercontent.com/u/0?v=4",
        "date": timestamp,
        "text": f"Este archivo fue generado el {timestamp}",
        "source": "Script de testimonios",
        "source_url": "https://github.com/JuanPabloDiaz/jpdiaz",
        "comment_url": "https://github.com/JuanPabloDiaz/jpdiaz",
        "repository": {
            "owner": "JuanPabloDiaz",
            "name": "jpdiaz",
            "full_name": "JuanPabloDiaz/jpdiaz"
        }
    })
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(formatted_testimonials, f, indent=2, ensure_ascii=False)
    
    print(f"Saved {len(formatted_testimonials)} testimonials to {output_file}")

def process_repository(owner, repo, scan_prs, scan_issues, scan_discussions, min_words, max_words):
    """Process a single repository to find testimonials."""
    # Save original values
    global REPO_OWNER, REPO_NAME
    original_owner = REPO_OWNER
    original_repo = REPO_NAME
    
    # Set current repository
    REPO_OWNER = owner
    REPO_NAME = repo
    
    print(f"\nProcessing repository: {owner}/{repo}")
    repo_testimonials = []
    
    # Process PRs
    if scan_prs:
        try:
            prs = get_merged_prs()
            print(f"Processing up to {min(len(prs), MAX_PRS_PER_REPO)} merged PRs")
            
            # Process only a limited number of PRs
            for pr in prs[:MAX_PRS_PER_REPO]:
                print(f"  Checking PR #{pr['number']}: {pr['title'][:40]}...")
                comments = get_comments_from_pr(pr["number"], pr["html_url"], pr["title"])
                if comments:
                    print(f"    Found {len(comments)} comments")
                    repo_testimonials.extend(comments)
        except Exception as e:
            print(f"Error processing PRs for {owner}/{repo}: {e}")
    
    # Process Issues
    if scan_issues:
        try:
            issues = get_issues()
            print(f"Processing up to {min(len(issues), MAX_ISSUES_PER_REPO)} issues")
            
            # Process only a limited number of issues
            for issue in issues[:MAX_ISSUES_PER_REPO]:
                print(f"  Checking Issue #{issue['number']}: {issue['title'][:40]}...")
                comments = get_comments_from_issue(issue["number"], issue["html_url"], issue["title"])
                if comments:
                    print(f"    Found {len(comments)} comments")
                    repo_testimonials.extend(comments)
        except Exception as e:
            print(f"Error processing issues for {owner}/{repo}: {e}")
    
    # Process Discussions
    if scan_discussions:
        try:
            discussions = get_discussions()
            print(f"Processing up to {min(len(discussions), MAX_DISCUSSIONS_PER_REPO)} discussions")
            
            # Process only a limited number of discussions
            for discussion in discussions[:MAX_DISCUSSIONS_PER_REPO]:
                print(f"  Checking Discussion: {discussion['title'][:40]}...")
                comments = get_comments_from_discussion(discussion["number"], discussion["html_url"], discussion["title"])
                if comments:
                    print(f"    Found {len(comments)} comments")
                    repo_testimonials.extend(comments)
        except Exception as e:
            print(f"Error processing discussions for {owner}/{repo}: {e}")
    
    # Restore original values
    REPO_OWNER = original_owner
    REPO_NAME = original_repo
    
    print(f"Found {len(repo_testimonials)} total comments in {owner}/{repo}")
    return repo_testimonials

def main():
    parser = argparse.ArgumentParser(description="Find potential testimonials from GitHub PRs, issues, and discussions")
    parser.add_argument("--token", help="GitHub Personal Access Token (overrides .env file)")
    parser.add_argument("--owner", help="Repository owner (overrides default)")
    parser.add_argument("--repo", help="Repository name (overrides default)")
    parser.add_argument("--exclude", help="GitHub username to exclude (overrides default)")
    parser.add_argument("--output", "-o", help="Output JSON file path (overrides default)")
    parser.add_argument("--min-words", type=int, help="Minimum number of words in a testimonial (overrides default)")
    parser.add_argument("--max-words", type=int, help="Maximum number of words in a testimonial (overrides default)")
    parser.add_argument("--max-prs", type=int, help="Maximum number of PRs to process per repository")
    parser.add_argument("--max-issues", type=int, help="Maximum number of issues to process per repository")
    parser.add_argument("--max-discussions", type=int, help="Maximum number of discussions to process per repository")
    parser.add_argument("--skip-prs", action="store_true", help="Skip scanning pull requests")
    parser.add_argument("--skip-issues", action="store_true", help="Skip scanning issues")
    parser.add_argument("--skip-discussions", action="store_true", help="Skip scanning discussions")
    parser.add_argument("--skip-external", action="store_true", help="Skip scanning external repositories")
    parser.add_argument("--skip-main", action="store_true", help="Skip scanning main repository")
    parser.add_argument("--only-external", action="store_true", help="Only scan external repositories")
    parser.add_argument("--only-main", action="store_true", help="Only scan main repository")
    parser.add_argument("--single-repo", help="Process only a specific external repository (format: owner/repo)")
    
    args = parser.parse_args()
    
    # Override global variables with command line arguments if provided
    global GITHUB_TOKEN, REPO_OWNER, REPO_NAME, EXCLUDE_USER
    
    if args.token:
        GITHUB_TOKEN = args.token
    if args.owner:
        REPO_OWNER = args.owner
    if args.repo:
        REPO_NAME = args.repo
    if args.exclude:
        EXCLUDE_USER = args.exclude
    
    # Get output file path
    output_file = args.output if args.output else OUTPUT_FILE
    
    # Get word count limits
    min_words = args.min_words if args.min_words is not None else MIN_WORDS
    max_words = args.max_words if args.max_words is not None else MAX_WORDS
    
    # Get API limits
    global MAX_PRS_PER_REPO, MAX_ISSUES_PER_REPO, MAX_DISCUSSIONS_PER_REPO
    if args.max_prs is not None:
        MAX_PRS_PER_REPO = args.max_prs
    if args.max_issues is not None:
        MAX_ISSUES_PER_REPO = args.max_issues
    if args.max_discussions is not None:
        MAX_DISCUSSIONS_PER_REPO = args.max_discussions
    
    # Determine what to scan
    scan_prs = not args.skip_prs and SCAN_PRS
    scan_issues = not args.skip_issues and SCAN_ISSUES
    scan_discussions = not args.skip_discussions and SCAN_DISCUSSIONS
    scan_external = not args.skip_external and SCAN_EXTERNAL_REPOS
    scan_main = not args.skip_main and SCAN_MAIN_REPO
    only_external = args.only_external or (scan_external and not SCAN_MAIN_REPO)
    
    # Validate required parameters
    if not GITHUB_TOKEN:
        print("Error: GitHub token not provided. Add PUBLIC_GITHUB_TOKEN to .env file or use --token")
        sys.exit(1)
    
    if not REPO_OWNER and not only_external:
        print("Error: Repository owner not provided. Set REPO_OWNER in the script or use --owner")
        sys.exit(1)
    
    if not REPO_NAME and not only_external:
        print("Error: Repository name not provided. Set REPO_NAME in the script or use --repo")
        sys.exit(1)
    
    print(f"\n===== GitHub Testimonial Finder =====")
    if scan_main and not only_external:
        print(f"Main repository: {REPO_OWNER}/{REPO_NAME}")
    else:
        print(f"Main repository: SKIPPED")
    if scan_external:
        print(f"External repositories: {len(EXTERNAL_REPOS)}")
    else:
        print(f"External repositories: SKIPPED")
    print(f"Excluding comments from: {EXCLUDE_USER}")
    print(f"Output file: {output_file}")
    print(f"Scanning: {'PRs ' if scan_prs else ''}{'Issues ' if scan_issues else ''}{'Discussions' if scan_discussions else ''}")
    print(f"Word limits: Min={min_words}, {'Max=' + str(max_words) if max_words else 'No maximum'}")
    print(f"================================\n")
    
    all_testimonials = []
    
    # Process main repository if requested
    if not only_external and scan_main:
        print(f"Processing main repository: {REPO_OWNER}/{REPO_NAME}")
        main_testimonials = process_repository(
            REPO_OWNER, 
            REPO_NAME, 
            scan_prs, 
            scan_issues, 
            scan_discussions,
            min_words,
            max_words
        )
        all_testimonials.extend(main_testimonials)
    elif not scan_main:
        print(f"Skipping main repository: {REPO_OWNER}/{REPO_NAME}")
    
    # Process external repositories if requested
    if scan_external and EXTERNAL_REPOS:
        # Check if we're only processing a single external repo
        if args.single_repo:
            owner_repo = args.single_repo.split('/')
            if len(owner_repo) == 2:
                owner, repo = owner_repo
                print(f"\nProcessing single external repository: {owner}/{repo}")
                external_testimonials = process_repository(
                    owner,
                    repo,
                    scan_prs,
                    scan_issues,
                    scan_discussions,
                    min_words,
                    max_words
                )
                all_testimonials.extend(external_testimonials)
            else:
                print(f"Invalid repository format: {args.single_repo}. Expected format: owner/repo")
        else:
            print(f"\nProcessing {len(EXTERNAL_REPOS)} external repositories...")
            for repo_info in EXTERNAL_REPOS:
                external_testimonials = process_repository(
                    repo_info["owner"],
                    repo_info["repo"],
                    scan_prs,
                    scan_issues,
                    scan_discussions,
                    min_words,
                    max_words
                )
                all_testimonials.extend(external_testimonials)
    elif not scan_external:
        print("Skipping external repositories")
    
    # Filter testimonials
    filtered_testimonials = filter_testimonials(all_testimonials, min_words, max_words)
    
    # Sort by date (newest first)
    filtered_testimonials.sort(key=lambda x: x["created_at"], reverse=True)
    
    # Group by repository
    testimonials_by_repo = {}
    for t in filtered_testimonials:
        repo_name = t["source_url"].split("/")[4]  # Extract repo name from URL
        if repo_name not in testimonials_by_repo:
            testimonials_by_repo[repo_name] = []
        testimonials_by_repo[repo_name].append(t)
    
    # Print summary
    print(f"\nFound {len(filtered_testimonials)} potential testimonials from others.")
    print(f"Sources: {len([t for t in filtered_testimonials if t['type'] == 'pull_request'])} from PRs, "
          f"{len([t for t in filtered_testimonials if t['type'] == 'issue'])} from issues, "
          f"{len([t for t in filtered_testimonials if t['type'] == 'discussion'])} from discussions")
    
    # Print repository breakdown
    print("\nBreakdown by repository:")
    for repo, testimonials in testimonials_by_repo.items():
        print(f"  - {repo}: {len(testimonials)} testimonials")
    
    # Save to JSON
    save_to_json(filtered_testimonials, output_file)
    
    # Print a sample of testimonials
    if filtered_testimonials:
        print("\nSample testimonials:")
        for i, comment in enumerate(filtered_testimonials[:5]):
            print(f"\n{i+1}. {comment['user']} said (in {comment['source']}):")
            print(f"{comment['body'][:200]}..." if len(comment['body']) > 200 else comment['body'])
            print(f"URL: {comment['url']}")
    else:
        print("\nNo testimonials found that meet the criteria.")
        print("Try adjusting the word limits or checking other repositories.")
        print("You may also want to check if your GitHub token has the necessary permissions.")

if __name__ == "__main__":
    main()