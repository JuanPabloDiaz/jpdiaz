# Custom Redirects with Vercel

Here is what I did to redirect a URL in Vercel

## How to redirect a URL to another URL

Vercel allows you to redirect a URL to another URL by creating a file called `vercel.json` in the root of your project and adding a `redirects` property to it.

```json
{
	"redirects": [
		{
			"source": "/docs",
			"destination": "https://doc-jpdiaz.vercel.app"
		}
	]
}
```

> In this example, all requests to `/docs` will be redirected to `https://doc-jpdiaz.vercel.app`.

In other words, if you visit `jpdiaz.dev/docs`, you will be redirected to `https://doc-jpdiaz.vercel.app`.

Then I went into vercel and redirected the URL `https://doc-jpdiaz.vercel.app` to my custom domain `docs.jpdiaz.dev`. It will not work if you don't do this step.
