# EmailJS Integration Setup - COMPLETE GUIDE

## 🚀 Quick Setup (5 minutes)

Your contact form is already coded and ready! You just need to set up EmailJS to receive emails.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click "Sign Up" and create account with **farihahabib2202@gmail.com**
3. Verify your email address

## Step 2: Add Gmail Service

1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Select "Gmail"
4. Connect your Gmail account (farihahabib2202@gmail.com)
5. **Copy the Service ID** (looks like: service_xxxxxxx)

## Step 3: Create Email Template

1. Go to "Email Templates" in dashboard
2. Click "Create New Template"
3. Use this template content:

```
Subject: Portfolio Contact: {{subject}}

New message from your portfolio website!

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Sent from your portfolio contact form
Reply directly to: {{from_email}}
```

4. **Copy the Template ID** (looks like: template_xxxxxxx)

## Step 4: Get Public Key

1. Go to "Account" → "General"
2. Find "Public Key" section
3. **Copy your Public Key** (looks like: xxxxxxxxxxxxxxx)

## Step 5: Update Your Code

Replace these lines in `src/App.tsx` (around line 53-55):

```typescript
const EMAILJS_SERVICE_ID = 'service_fariha_portfolio'      // ← Replace with your Service ID
const EMAILJS_TEMPLATE_ID = 'template_contact_form'        // ← Replace with your Template ID  
const EMAILJS_PUBLIC_KEY = 'fariha_public_key_2025'       // ← Replace with your Public Key
```

## Step 6: Test Your Contact Form

1. Save the file and refresh your portfolio
2. Fill out the contact form and submit
3. Check your Gmail inbox for the message!

## 🎉 That's it! Your contact form is now fully functional!

## Current Status

✅ Contact form UI - COMPLETE
✅ Form validation - COMPLETE  
✅ EmailJS integration code - COMPLETE
✅ Success/error handling - COMPLETE
⏳ EmailJS credentials - NEEDS YOUR SETUP

## Troubleshooting

**Form shows "EmailJS Setup Required" message?**
- You need to replace the placeholder credentials in App.tsx

**Not receiving emails?**
- Check your Gmail spam folder
- Verify your EmailJS service is connected
- Make sure template variables match exactly

**Need help?**
- EmailJS has great documentation at docs.emailjs.com
- Their free plan allows 200 emails/month (perfect for portfolio)