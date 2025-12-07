# MJML Email Template System

## Setup Complete ✅

Your email template system now uses MJML with EJS for easy customization!

### How It Works

1. **MJML Source Files** → `netlify/functions/lib/templates/*.mjml`

    - Easy-to-read, component-based email markup
    - Used for development and maintenance

2. **Build Script** → `scripts/compile-mjml.js`

    - Compiles MJML → HTML
    - Converts template variables from `{{VARIABLE}}` to EJS syntax `<%- variable %>`
    - Outputs to `netlify/functions/lib/templates/compiled/*.ejs`

3. **Runtime** → `netlify/functions/lib/email-templates.js`
    - Loads pre-compiled EJS templates
    - Renders with data using EJS engine
    - No build-time overhead during email sending

### Available Templates

-   **order-confirmation.ejs** - Order confirmation to customer
-   **order-received-admin.ejs** - Order notification to admin
-   **dispatch-confirmation.ejs** - Dispatch notification to customer

### Usage

#### Compile Templates

```bash
npm run mjml
```

Run this whenever you update MJML files.

#### Use in Code

```javascript
import { getOrderConfirmationHTML } from "./email-templates.js";

const orderData = {
	/* order object */
};
const html = getOrderConfirmationHTML(orderData);

// Send with Brevo API or store as preview
```

#### Test/Preview Emails

```bash
node test-email.js
```

Generates HTML preview files:

-   `email-preview-order-confirmation.html`
-   `email-preview-order-received-admin.html`
-   `email-preview-blank-cards-confirmation.html`
-   `email-preview-blank-cards-admin.html`

### Template Data Variables

**Order Confirmation:**

-   `orderId`, `orderType`, `shippingMethod`
-   `recipientName`, `address1`, `address2`, `city`, `postcode`
-   `orderDescription`

**Admin Order Received:**

-   `orderId`, `orderType`, `customerEmail`, `shippingMethod`, `orderDate`
-   `recipientName`, `address1`, `address2`, `city`, `postcode`
-   `orderDetails` (HTML string with order-specific info)

**Dispatch Confirmation:**

-   `orderId`, `orderType`, `recipientName`
-   `trackingNumber`, `trackingUrl`, `estimatedDelivery`

### Benefits of This Setup

✅ **Easy Customization** - Edit MJML files directly with familiar markup
✅ **Responsive** - MJML compiles to responsive email HTML automatically
✅ **No Runtime Overhead** - Templates pre-compiled, EJS renders quickly
✅ **Brand Consistency** - Single source of truth for email design
✅ **Version Control** - MJML files tracked in git, not generated HTML
✅ **Preview Generation** - Test script creates browser-viewable previews

### File Structure

```
netlify/functions/lib/
├── templates/
│   ├── order-confirmation.mjml
│   ├── order-received-admin.mjml
│   ├── dispatch-confirmation.mjml
│   └── compiled/
│       ├── order-confirmation.ejs
│       ├── order-received-admin.ejs
│       └── dispatch-confirmation.ejs
├── email-templates.js (loads and renders compiled templates)
└── email-helpers.js (sends via Brevo API)

scripts/
└── compile-mjml.js (build script)

package.json (with mjml and ejs dependencies)
```

### Next Steps

1. Customize MJML templates in `netlify/functions/lib/templates/`
2. Run `npm run mjml` to compile changes
3. Test with `node test-email.js`
4. Preview generated HTML files in browser
5. Emails automatically use latest templates on deployment
