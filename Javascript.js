class URLShortener {
  constructor(fixedLength = 8) {
      this.fixedLength = fixedLength;
      this.urlMap = {};
  }

  encodeURL(longURL) {
      const shortCode = this.generateShortCode(longURL);
      this.urlMap[shortCode] = longURL;
      return shortCode;
  }

  decodeURL(shortCode) {
      const longURL = this.urlMap[shortCode];
      if (longURL) {
          return longURL;
      } else {
          return "Original URL not found.";
      }
  }

  generateShortCode(longURL) {
      const hash = this.hashString(longURL);
      return hash.substring(0, this.fixedLength);
  }

  hashString(input) {
      // Basic hashing function, you may replace it with a stronger hashing algorithm if needed
      let hash = 0;
      if (input.length == 0) return hash;
      for (let i = 0; i < input.length; i++) {
          let char = input.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash = hash & hash; // Convert to 32bit integer
      }
      return hash.toString();
  }
}

// Example usage:
const shortener = new URLShortener();
const longURL = "https://www.w3schools.com/nodejs/nodejs_mongodb.asp";
const shortCode = shortener.encodeURL(longURL);
console.log("Shortened URL:", shortCode);
const originalURL = shortener.decodeURL(shortCode);
console.log("Original URL:", originalURL);
