<h1 align="center">Media Bar</h1>
<h2 align="center">A Jellyfin Plugin</h2>
<p align="center">
	<img alt="Logo" src="https://raw.githubusercontent.com/IAmParadox27/jellyfin-plugin-media-bar/main/src/logo.png" />
	<br />
	<br />
	<a href="https://github.com/IAmParadox27/jellyfin-plugin-media-bar/?tab=License-1-ov-file">
		<img alt="DBAD" src="https://img.shields.io/badge/license-DBAD-blue" />
	</a>
	<a href="https://github.com/IAmParadox27/jellyfin-plugin-media-bar/releases">
		<img alt="Current Release" src="https://img.shields.io/github/release/IAmParadox27/jellyfin-plugin-media-bar.svg" />
	</a>
</p>

## Reporting Issues

If you face issues relating to the visuals or behaviour of buttons added by the Media Bar please report them on MakD's repo (the one this is forked from). This plugin pulls the content from their repo directly and is only in control of adding it without the need for modifying your JF install files.

Any issues with plugin's settings (including using a playlist as your avatar's playlist) should be made here.
## Development Update - 20th August 2025

Hey all! Things are changing with my plugins are more and more people start to use them and report issues. In order to make it easier for me to manage I'm splitting bugs and features into different areas. For feature requests please head over to <a href="https://features.iamparadox.dev/">https://features.iamparadox.dev/</a> where you'll be able to signin with GitHub and make a feature request. For bugs please report them on the relevant GitHub repo and they will be added to the <a href="https://github.com/users/IAmParadox27/projects/1/views/1">project board</a> when I've seen them. I've found myself struggling to know when issues are made and such recently so I'm also planning to create a system that will monitor a particular view for new issues that come up and send me a notification which should hopefully allow me to keep more up to date and act faster on various issues.

As with a lot of devs, I am very momentum based in my personal life coding and there are often times when these projects may appear dormant, I assure you now that I don't plan to let these projects go stale for a long time, there just might be times where there isn't an update or response for a couple weeks, but I'll try to keep that better than it has been. With all new releases to Jellyfin I will be updating as soon as possible, I have already made a start on 10.11.0 and will release an update to my plugins hopefully not long after that version is officially released!
## Installation

### Prerequisites
- This plugin is based on Jellyfin Version `10.10.7`
- The following plugins are required to also be installed, please following their installation guides:
  - File Transformation (https://github.com/IAmParadox27/jellyfin-plugin-file-transformation) at least v2.2.1.0

### Installation
1. Add `https://www.iamparadox.dev/jellyfin/plugins/manifest.json` to your plugin repositories.
2. Install `Media Bar` from the Catalogue.
3. Restart Jellyfin.
4. Force refresh your webpage (or app) and you should see your new Media Bar at the top of the home page.
## Upcoming Features/Known Issues
If you find an issue with any of the sections or usage of the plugin, please open an issue on GitHub.

### FAQ

#### I've updated Jellyfin to latest version but I can't see the plugin available in the catalogue

The likelihood is the plugin hasn't been updated for that version of Jellyfin and the plugins are strictly 1 version compatible. Please wait until an update has been pushed. If you can see the version number in the release assets then please make an issue, but if its not in the assets, please wait. I know Jellyfin has updated, I'll update when I can.

#### I've installed the plugins and the media bar doesn't appear. How do I fix?
This is common, particularly on a fresh install. The first thing you should try is the following
1. Launch your browsers developer tools

![image](https://github.com/user-attachments/assets/e8781a69-464e-430e-a07c-5172a620ef84)

3. Open the **Network** tab across the top bar
4. Check the **Disable cache** checkbox
5. Refresh the page **while the dev tools are still open**

![image](https://github.com/user-attachments/assets/6f8c3fc7-89a3-4475-b8a6-cd4a58d51b84)

## Credits
Credits for this plugin go to @MakD for his original work and to @BobHasNoSoul and @SethBacon for their influence to MakD. For full credits see below in the original README content

## Original README

<details>
  <summary>Original README.md from MakD</summary>
  
## TODO - Design changes upcoming next release

Thanks to the Man, the Legend [BobHasNoSoul](https://github.com/BobHasNoSoul) for his work on the [jellyfinfeatured](https://github.com/BobHasNoSoul/jellyfin-featured) and [SethBacon](https://forum.jellyfin.org/u-sethbacon) and [TedHinklater](https://github.com/tedhinklater) for their take on the [Jellyfin-Featured-Content-Bar](https://github.com/tedhinklater/Jellyfin-Featured-Content-Bar). 

Here I present my version of the same with some code improvements, loading optimizations, and Security Enhancements. Works best with the [Zombie theme](https://github.com/MakD/zombie-release) (_Shameless Plug_), but it fits with every other theme the creators have put their hard work in. You might've to edit the color accents in the CSS to match yours.

<details>
<summary> Desktop Layout </summary>
  
![Jellyfin Desktop Layout](https://raw.githubusercontent.com/MakD/Jellyfin-Media-Bar/refs/heads/main/img/Jelly-Web.png)
  
</details>

<details>
<summary> Mobile Layout </summary>
  
![Jellyfin Mobile Layout](https://raw.githubusercontent.com/MakD/Jellyfin-Media-Bar/refs/heads/main/img/Jelly-Mobile.png)

</details>

> <ins>**Before Installing, please take a backup of your index.html and home-html.xxxxxx.chunk.js files**<ins>

# Prepping the Environment

<details>
  
<summary> Steps </summary>

1. Create a folder `avatars` in your `jellyfin-web` folder. (Usually in C:\Program Files\Jellyfin\Server)
2. Download the files `slideshowpure.js` and `slideshowpure.css`
3. Paste them inside the avatars folder created, and you are ready to venture down the rabbit hole.

</details>

# Prepping the files
<details>
  
<summary>index.html</summary>

  1. Navigate to your `jellyfin-web` folder and search for the file index.html. (you can use any code editor, just remember to open with administrator privileges.
  2. Search for `</body></html>`
  3. Just before the `</body`, plug the below code
```

    <script>
      function saveCredentialsToSessionStorage(credentials) {
        try {
          sessionStorage.setItem(
            "json-credentials",
            JSON.stringify(credentials)
          );
          console.log("Credentials saved to sessionStorage.");
        } catch (error) {
          console.error("Error saving credentials:", error);
        }
      }
      function saveApiKey(apiKey) {
        try {
          sessionStorage.setItem("api-key", apiKey);
          console.log("API key saved to sessionStorage.");
        } catch (error) {
          console.error("Error saving API key:", error);
        }
      }
      (function () {
        var originalConsoleLog = console.log;
        console.log = function (message) {
          originalConsoleLog.apply(console, arguments);
          if (
            typeof message === "string" &&
            message.startsWith("Stored JSON credentials:")
          ) {
            try {
              var jsonString = message.substring(
                "Stored JSON credentials: ".length
              );
              var credentials = JSON.parse(jsonString);
              saveCredentialsToSessionStorage(credentials);
            } catch (error) {
              console.error("Error parsing credentials:", error);
            }
          }
          if (
            typeof message === "string" &&
            message.startsWith("opening web socket with url:")
          ) {
            try {
              var url = message.split("url:")[1].trim();
              var urlParams = new URL(url).searchParams;
              var apiKey = urlParams.get("api_key");
              if (apiKey) {
                saveApiKey(apiKey);
              }
            } catch (error) {
              console.error("Error extracting API key:", error);
            }
          }
        };
      })();
    </script>
    <link rel="preload" href="/web/avatars/slideshowpure.css" as="style" />
    <link rel="stylesheet" href="/web/avatars/slideshowpure.css" />
    <script defer src="/web/avatars/slideshowpure.js"></script>
```
</details>

<details>

<summary>home-html.xxxxxx.chunk.js</summary>

1. Similarly, search for `home-html` in the `jellyfin-web` directory. You should be able to see a file named `home-html.xxxxxx.chunk.js` with random numbers in place of the `xxxx`. Open it with any code editor with administrator privileges.
2. Search for `id="homeTab" data-index="0">`
3. Right after the `>`, paste the code block `<div id="slides-container"></div><script>slidesInit()</script>`

</details>

And that is it. Hard refresh your web page (CTRL+Shift+R) twice, and Profit!

# Want a Custom List to be showcased instead of random items??

No worries this got you covered. 

## Steps

1. Create a `list.txt` file inside your `avatars` folder.
2. In line 1 give your list a name.
3. Starting line 2, paste the item IDs you want to be showcased, one ID per line. For Example :

```
Awesome Playlist Name
ItemID1
ItemID2
ItemID3
ItemID4
ItemID5
```
The next time it loads, it will display these items.
</details>
