# EmailJS Integration Setup

## Step 1: Install EmailJS

Run this command to install EmailJS:

```bash
npm install @emailjs/browser
```

## Step 2: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Create a new service (Gmail, Outlook, etc.)
4. Create an email template
5. Get your credentials

## Step 3: EmailJS Template Setup

Create a template with these variables:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{subject}}` - Email subject
- `{{message}}` - Email message
- `{{to_email}}` - Your email (farihahabib2202@gmail.com)

Example template:
```
Subject: New Contact Form Message: {{subject}}

From: {{from_name}} ({{from_email}})
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
Reply to: {{from_email}}
```

## Step 4: Update App.tsx

Replace the import and add EmailJS integration:

```typescript
import emailjs from '@emailjs/browser'

// Add these constants with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = 'your_service_id'
const EMAILJS_TEMPLATE_ID = 'your_template_id' 
const EMAILJS_PUBLIC_KEY = 'your_public_key'

// Initialize EmailJS in useEffect
useEffect(() => {
  emailjs.init(EMAILJS_PUBLIC_KEY)
  // ... rest of useEffect
}, [])

// Replace the handleSubmit function
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)
  setSubmitStatus('idle')

  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: 'farihahabib2202@gmail.com',
      reply_to: formData.email
    }

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    )

    if (response.status === 200) {
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    }
  } catch (error) {
    console.error('EmailJS Error:', error)
    setSubmitStatus('error')
    
    setTimeout(() => {
      setSubmitStatus('idle')
    }, 5000)
  } finally {
    setIsSubmitting(false)
  }
}
```

## Step 5: Environment Variables (Optional)

For security, create a `.env` file:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Then use them in your code:
```typescript
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
```

## Current Status

The contact form is currently set up with:
- ✅ Form validation
- ✅ Loading states
- ✅ Success/error messages
- ✅ Form reset after submission
- ✅ Disabled state during submission
- ⏳ EmailJS integration (needs setup)

The form will work once you complete the EmailJS setup above!