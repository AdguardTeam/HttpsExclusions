# HTTPS filtering

## What does this repo contain?

By default, AdGuard doesn't filter websites of financial services and websites with important personal data.
This repo contains the list of excluded websites.

Here is a detailed description of how it works: https://kb.adguard.com/en/general/https-filtering.

If you want us to add any domain into this list, please create a [new issue](https://github.com/AdguardTeam/HttpsExclusions/issues/new).

## What is HTTPS?

HTTPS is similar to HTTP (Hyper Text Transfer Protocol), but using an encryption protocol (called SSL/TLS), as indicated by the last letter S (Secure). This protocol is used for the transmission of sensitive information, such as MasterCard/Visa card numbers and personal data.

## Why should it be filtered?

Now more and more websites, blogs, and social networks are switching to HTTPS. Then, following blogs and websites, more and more ad networks are switching to HTTPS as well, because it is necessary to display ads on the sites working over HTTPS.

The following are examples of popular websites, where ads cannot be removed without HTTPS filtering: youtube.com, facebook.com and twitter.com.

## How does the filtering of encrypted traffic work?

If this was easy, HTTPS wouldn't be secure. In order to filter secure traffic, AdGuard will create two secure connections. One to a browser, or other application; and another to a server. It is important that in this case the browser "trusts" AdGuard and its created connection. For this purpose Adguard generates and installs a special root certificate in the system and, if necessary, in certain browsers e.g. Firefox.

## Does my traffic stay secure and encrypted?

Of course! Your connection to the remote server stays encrypted and secure. Just like a browser AdGuard checks the server certificate before starting to filter it.

There are two modes of HTTPS filtering:

* Filter ONLY connections to domains on the blacklist.
* Filter ALL connections EXCEPT those to domains on the whitelist. We have pre-added domains of financial institutions and banks there, and this list will be updated in the future.

## How to generate lists

```
git clone https://github.com/AdguardTeam/HttpsExclusions.git
cd HttpsExclusions
node index.js
```

Check the `dist` folder for the output.

## How the list gets updated in the AdGuard apps 

The list of HTTPS exclusions gets updated automatically when a new version of the app is released. For the new version, current exclusions from this repository are fetched and set as default.

Note: the HTTPS exclusions list gets updated in **compile-time** because it is built into the application.  

When you update AdGuard, the exclusion list will be updated **unless you modified it before**. If you have made changes to it, you won't get any updates.