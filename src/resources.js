import {substitute} from "./utils/replacements";
import {createBase64Url, createBlobUrl} from "./utils/core";
import Path from "./utils/path";
import path from "path-webpack";

/**
 * Handle Package Resources
 * @class
 * @param {Manifest} manifest
 * @param {[object]} options
 * @param {[string="base64"]} options.replacements
 * @param {[Archive]} options.archive
 * @param {[method]} options.resolver
 */
class Resources {
	constructor(manifest, options) {
		this.settings = {
			replacements: (options && options.replacements) || "base64",
			archive: (options && options.archive),
			resolver: (options && options.resolver)
		};
		this.manifest = manifest;
		this.resources = Object.keys(manifest).
			map(function (key){
				return manifest[key];
			});

		this.replacementUrls = [];

		this.split();
		this.splitUrls();
	}

	/**
	 * Split resources by type
	 * @private
	 */
	split(){

		// HTML
		this.html = this.resources.
			filter(function (item){
				if (item.type === "application/xhtml+xml" ||
						item.type === "text/html") {
					return true;
				}
			});

		// Exclude HTML
		this.assets = this.resources.
			filter(function (item){
				if (item.type !== "application/xhtml+xml" &&
						item.type !== "text/html") {
					return true;
				}
			});

		// Only CSS
		this.css = this.resources.
			filter(function (item){
				if (item.type === "text/css") {
					return true;
				}
			});
	}

	/**
	 * Convert split resources into Urls
	 * @private
	 */
	splitUrls(){

		// All Assets Urls
		this.urls = this.assets.
			map(function(item) {
				return item.href;
			}.bind(this));

		// Css Urls
		this.cssUrls = this.css.map(function(item) {
			return item.href;
		});

	}

	/**
	 * Create urls for all the assets
	 * @param  {Archive} archive
	 * @param  {resolver} resolver Url resolver
	 * @return {Promise}         returns replacement urls
	 */
	replacements(archive, resolver){
		archive = archive || this.settings.archive;
		resolver = resolver || this.settings.resolver;

		if (this.settings.replacements === "none") {
			return new Promise(function(resolve) {
				resolve(this.urls);
			}.bind(this));
		}

		var replacements = this.urls.
			map( (url) => {
				var absolute = resolver(url);
				return archive.createUrl(absolute, {"base64": (this.settings.replacements === "base64")});
			});

		return Promise.all(replacements)
			.then( (replacementUrls) => {
				this.replacementUrls = replacementUrls;
				return replacementUrls;
			});
	}

	/**
	 * Replace URLs in CSS resources
	 * @private
	 * @param  {[Archive]} archive
	 * @param  {[method]} resolver
	 * @return {Promise}
	 */
	replaceCss(archive, resolver){
		var replaced = [];
		archive = archive || this.settings.archive;
		resolver = resolver || this.settings.resolver;
		this.cssUrls.forEach(function(href) {
			var replacement = this.createCssFile(href, archive, resolver)
				.then(function (replacementUrl) {
					// switch the url in the replacementUrls
					var indexInUrls = this.urls.indexOf(href);
					if (indexInUrls > -1) {
						this.replacementUrls[indexInUrls] = replacementUrl;
					}
				}.bind(this));

			replaced.push(replacement);
		}.bind(this));
		return Promise.all(replaced);
	}

	/**
	 * Create a new CSS file with the replaced URLs
	 * @private
	 * @param  {string} href the original css file
	 * @param  {[Archive]} archive
	 * @param  {[method]} resolver
	 * @return {Promise}  returns a BlobUrl to the new CSS file or a data url
	 */
	createCssFile(href, archive, resolver){
		var newUrl;
		archive = archive || this.settings.archive;
		resolver = resolver || this.settings.resolver;

		if (path.isAbsolute(href)) {
			return new Promise(function(resolve){
				resolve();
			});
		}

		var absolute = resolver(href);

		// Get the text of the css file from the archive
		var textResponse = archive.getText(absolute);
		// Get asset links relative to css file
		var relUrls = this.urls.map( (assetHref) => {
			var resolved = resolver(assetHref);
			var relative = new Path(absolute).relative(resolved);

			return relative;
		});

		return textResponse.then( (text) => {
			// Replacements in the css text
			text = substitute(text, relUrls, this.replacementUrls);

			// Get the new url
			if (this.settings.replacements === "base64") {
				newUrl = createBase64Url(text, "text/css");
			} else {
				newUrl = createBlobUrl(text, "text/css");
			}

			return newUrl;
		});

	}

	/**
	 * Resolve all resources URLs relative to an absolute URL
	 * @param  {string} absolute to be resolved to
	 * @param  {[resolver]} resolver
	 * @return {string[]} array with relative Urls
	 */
	relativeTo(absolute, resolver){
		resolver = resolver || this.settings.resolver;

		// Get Urls relative to current sections
		return this.urls.
			map(function(href) {
				var resolved = resolver(href, false);
				var relative = new Path(absolute).relative(resolved);
				console.log(relative, absolute, resolved);

				return relative;
			}.bind(this));
	}

	/**
	 * Get a URL for a resource
	 * @param  {string} path
	 * @return {string} url
	 */
	get(path) {
		var indexInUrls = this.urls.indexOf(path);
		if (indexInUrls === -1) {
			return;
		}
		if (this.replacementUrls.length) {
			return new Promise(function(resolve, reject) {
				resolve(this.replacementUrls[indexInUrls]);
			}.bind(this));
		} else {
			return this.archive.createUrl(path,
				{"base64": (this.settings.replacements === "base64")});
		}
	}

	/**
	 * Substitute urls in content, with replacements,
	 * relative to a url if provided
	 * @param  {string} content
	 * @param  {[string]} url   url to resolve to
	 * @return {string}         content with urls substituted
	 */
	substitute(content, url) {
		var relUrls;
		if (url) {
			relUrls = this.relativeTo(url);
		} else {
			relUrls = this.urls;
		}
		return substitute(content, relUrls, this.replacementUrls);
	}
}

export default Resources;