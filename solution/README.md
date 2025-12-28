# First Contact - Solution Writeup

## Challenge Overview

This challenge teaches fundamental web reconnaissance techniques by exploring an alien surveillance dashboard. Participants learn to:
- Inspect HTML source code and comments
- Navigate CSS files for hidden references
- Use browser DevTools to examine client-side storage
- Apply basic encoding/decoding techniques

**Total Flags:** 2

---

## Flag 1: Hidden Diagnostic Page

**Vulnerability:** Information Disclosure / Security Misconfiguration

**Learning Goal:** Developers often leave debug pages, TODO comments, and development artifacts in production code. These can leak sensitive information.

### Solution Steps

#### Step 1: View Page Source

Open the main page and view the HTML source code:
- **Method 1:** Right-click → "View Page Source"
- **Method 2:** Press `Ctrl+U` (Windows/Linux) or `Cmd+Option+U` (Mac)
- **Method 3:** Add `view-source:` before the URL

**What to look for:** HTML comments with TODO, FIXME, or DEV NOTE tags

You should see comments like:
```html
<!-- TODO: Clean up debug endpoints before launch -->
<!-- FIXME: Remove diagnostics access in production build -->
```

#### Step 2: Inspect CSS File

Notice the `<link>` tag referencing a CSS file:
```html
<link rel="stylesheet" href="/css/style.css">
```

Open DevTools and navigate to the CSS file:
- **Method 1:** DevTools → Sources → `css/style.css`
- **Method 2:** DevTools → Network → Reload page → Click on `style.css`
- **Method 3:** Manually navigate to `http://[challenge-url]/css/style.css`

**What to look for:** Comments mentioning other pages or features

You should find:
```css
/* Fixed alignment for /diagnostics.html button panel */
```

#### Step 3: Navigate to Hidden Page

Visit the discovered diagnostics page:
```
http://[challenge-url]/diagnostics.html
```

You'll see a diagnostic interface with a form and diagnostic output.

#### Step 4: Inspect Form Elements

Open DevTools and inspect the form:
- Right-click on the page → Inspect
- Or press `F12` → Elements tab

Look for hidden input fields. You should find:
```html
<input type="hidden" id="diag-key" value="RlRDSENBS1RBe2gxZGQzbl9kM3ZfcDRnM3NfbDM0a19zM2NyM3RzfQ==">
```

**Notice:** The value looks encoded (ends with `==` - typical of base64)

#### Step 5: Decode Base64

The hint on the page says: *"Diagnostic key format may vary by transmission protocol"*

First, decode the base64 string:

**Tools to decode base64:**
- **Online:** base64decode.org or any base64 decoder
- **Python:** `import base64; base64.b64decode("your_string").decode()`
- **Bash:** `echo "your_string" | base64 -d`
- **JavaScript Console:** `atob("your_string")`

```
Base64: fXN0M3JjM3NfazQzbF9zM2c0cF92M2RfbjNkZDFoe0ZUQ0tDQUhUQQ==
Decoded: }st3rc3s_k43l_s3g4p_v3d_n3dd1h{FTCKCAHTA
```

**Wait!** This doesn't look right. The decoded text is still gibberish.

#### Step 6: Reverse the Decoded String

The decoded string appears to be reversed! Reverse it to get the flag:

```
Decoded: }st3rc3s_k43l_s3g4p_v3d_n3dd1h{FTCKCAHTA
Reversed: ATHACKCTF{h1dd3n_d3v_p4g3s_l34k_s3cr3ts}
```

**Tools to reverse:**
- **Online:** Any "reverse string" tool
- **Python:** `"your_string"[::-1]`
- **Bash:** `echo "your_string" | rev`
- **JavaScript Console:** `"your_string".split('').reverse().join('')`

**Two-step decoding:** Base64 decode → Reverse string

**Flag 1:** `ATHACKCTF{h1dd3n_d3v_p4g3s_l34k_s3cr3ts}`

---

## Flag 2: Client-Side Storage Hunt

**Vulnerability:** Sensitive Data Exposure / Insecure Storage

**Learning Goal:** Never store sensitive data (flags, tokens, credentials) in client-side storage. Cookies, localStorage, and JavaScript files are all accessible to users.

### Solution Steps

#### Step 1: Identify Storage Hints

View the HTML source code and look for comments:
```html
<!-- TODO: Centralize authentication tokens - currently distributed across storage -->
<!-- SECURITY: Review client-side storage implementation before production -->
```

This hints that data is split across multiple storage locations.

#### Step 2: Check JavaScript Files

Open DevTools → Sources → Expand the file tree

Find and open `/js/main.js`:
```javascript
// Alien Surveillance Network - Main Control
// Authentication tokens configured in config.js

function initializeDashboard() {
    // Dashboard initialization code
}
```

This references another file: `config.js`

#### Step 3: Open config.js

Navigate to `/js/config.js` in Sources tab:
```javascript
// Alien Communication Protocol - Configuration
// 
// Multi-layer storage architecture for maximum security
// Data fragments stored across different storage mechanisms
// Assembling requires all components

const DATA_FRAGMENT_PART1 = "ATHACKCTF{cl13nt_s1d3_";

// Additional fragments loaded from secure storage
console.log("Storage initialization complete");
```

**Found:** First part of the flag: `ATHACKCTF{cl13nt_s1d3_`

The variable name `DATA_FRAGMENT_PART1` and comments suggest there are more parts.

#### Step 4: Check Browser Cookies

Open DevTools → Application tab → Cookies → Select the challenge domain

Look for cookies with relevant names. You should find:
```
Name: data_fragment_part2
Value: st0r4g3_1s_
```

**Found:** Second part: `st0r4g3_1s_`

#### Step 5: Check localStorage

In the same Application tab → Local Storage → Select the challenge domain

You should see:
```
Key: data_fragment_part3
Value: n3v3r_s3cur3}
```

**Found:** Third part: `n3v3r_s3cur3}`

#### Step 6: Concatenate All Parts

Combine all three parts in order:
```
Part 1 (config.js):    ATHACKCTF{cl13nt_s1d3_
Part 2 (cookie):       st0r4g3_1s_
Part 3 (localStorage): n3v3r_s3cur3}
```

**Flag 2:** `ATHACKCTF{cl13nt_s1d3_st0r4g3_1s_n3v3r_s3cur3}`

---

## Alternative Methods

### Using Browser Console

You can retrieve storage data directly from the JavaScript console:

**Check localStorage:**
```javascript
localStorage.getItem("data_fragment_part3")
```

**Check cookies:**
```javascript
document.cookie
```

**List all localStorage keys:**
```javascript
Object.keys(localStorage)
```

### Using Network Tab

You can find all 3 pieces of data in the network tab

**Check config.js**
- Response contains the raw .js file with part 1
- Cookies contains the set-cookie header with part 2

**Check `storage` endpoint**
- Response contains the raw .js file with part 3
- Cookies contains the set-cookie header with part 2

---

## Key Takeaways

1. **Always inspect source code** - Developers leave comments, TODOs, and references to hidden pages
2. **Check all file types** - CSS, JavaScript, and HTML can all contain valuable information
3. **Explore all client-side storage** - Cookies, localStorage, sessionStorage, and JavaScript variables are all accessible
4. **Look for encoding patterns** - Simple transformations (reverse, base64) are common obfuscation techniques
5. **Browser DevTools are essential** - Master the Elements, Sources, Network, and Application tabs

---

## Tools Used

- Web Browser (Chrome, Firefox, Edge, etc.)
- Browser DevTools (F12)
- Optional: Command-line tools for string manipulation

**No external tools or scripts required** - This challenge is solvable entirely through browser features.

---

## Security Lessons

### For Developers:

1. **Never deploy debug pages to production** - Remove diagnostic interfaces, admin panels, and test pages
2. **Clean up comments** - Remove TODO, FIXME, and development notes before deployment
3. **Client-side storage is NOT secure** - Anything stored in cookies, localStorage, or JavaScript is accessible to users
4. **Use proper secrets management** - API keys, tokens, and credentials should never be in client-side code
5. **Security through obscurity doesn't work** - Encoding or reversing strings doesn't provide real security

### For Security Researchers:

1. **Enumerate all resources** - Check HTML, CSS, JS, images, and any linked files
2. **Read comments carefully** - Developers often leave breadcrumbs unintentionally
3. **Use DevTools extensively** - Application, Network, and Sources tabs reveal client-side data
4. **Think like a developer** - What files would exist during development? What might be forgotten in production?

---