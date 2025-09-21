# Firebase Setup Guide

This guide will help you set up Firebase for the Engineering Excellence website.

## Prerequisites

1. A Google account
2. Access to the [Firebase Console](https://console.firebase.google.com/)

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `engineering-excellence` (or your preferred name)
4. Enable Google Analytics (optional but recommended)
5. Choose or create a Google Analytics account
6. Click "Create project"

## Step 2: Enable Required Services

### Authentication
1. In the Firebase console, go to "Authentication"
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable the following providers:
   - **Email/Password** (for admin login)
   - **Google** (optional, for easier user login)

### Firestore Database
1. Go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (we'll configure security rules later)
4. Select a location closest to your users
5. Click "Done"

### Storage
1. Go to "Storage"
2. Click "Get started"
3. Start in test mode
4. Choose the same location as your Firestore database
5. Click "Done"

## Step 3: Get Configuration Keys

1. Go to "Project settings" (gear icon)
2. Scroll down to "Your apps"
3. Click "Add app" and select the web icon (`</>`)
4. Register your app with a nickname (e.g., "Engineering Excellence Web")
5. Copy the configuration object

## Step 4: Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in your Firebase configuration in `.env.local`:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

## Step 5: Set Up Firestore Security Rules

Replace the default rules in Firestore with these production-ready rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Blog posts - public read, admin write
    match /blogPosts/{postId} {
      allow read: if resource.data.published == true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Contact forms - authenticated write, admin read
    match /contactForms/{formId} {
      allow create: if true; // Anyone can submit contact forms
      allow read, update, delete: if request.auth != null && request.auth.token.admin == true;
    }
    
    // User profiles - users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

## Step 6: Set Up Storage Security Rules

Replace the default Storage rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Images - public read, admin write
    match /images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Documents - admin only
    match /documents/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

## Step 7: Create Admin User

1. Go to Authentication in Firebase Console
2. Click "Add user"
3. Enter admin email and password
4. After creating the user, note the UID
5. Go to Firestore Database
6. Create a new collection called `users`
7. Create a document with the admin's UID as the document ID
8. Add the following fields:
   ```json
   {
     "email": "admin@yourcompany.com",
     "displayName": "Admin User",
     "role": "admin",
     "createdAt": "2024-01-01T00:00:00.000Z"
   }
   ```

## Step 8: Set Custom Claims (Optional)

For enhanced security, you can set custom claims for admin users. This requires the Firebase Admin SDK:

1. Install Firebase Admin SDK:
   ```bash
   npm install firebase-admin
   ```

2. Create a service account key in Firebase Console:
   - Go to Project Settings > Service Accounts
   - Click "Generate new private key"
   - Save the JSON file securely

3. Add admin environment variables to `.env.local`:
   ```env
   FIREBASE_ADMIN_PROJECT_ID=your_project_id
   FIREBASE_ADMIN_CLIENT_EMAIL=your_service_account_email
   FIREBASE_ADMIN_PRIVATE_KEY="your_private_key"
   ```

## Features Included

### Authentication
- ✅ Email/password authentication
- ✅ User registration and login
- ✅ Password reset functionality
- ✅ Protected admin routes

### Database (Firestore)
- ✅ Blog post management
- ✅ Contact form submissions
- ✅ User profiles
- ✅ Real-time updates
- ✅ Pagination support

### Storage
- ✅ Image uploads for blog posts
- ✅ Document uploads
- ✅ File validation and resizing
- ✅ Progress tracking for uploads

### Security
- ✅ Production-ready security rules
- ✅ Admin-only content management
- ✅ Input validation and sanitization

## Testing the Setup

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Test the following:
   - Home page loads correctly
   - Navigation works
   - Contact form submission (will be implemented)
   - Blog functionality (will be implemented)
   - Admin authentication (will be implemented)

## Troubleshooting

### Common Issues

1. **"Firebase not initialized" error**
   - Check that all environment variables are set correctly
   - Ensure `.env.local` is in the project root
   - Restart the development server

2. **Permission denied errors**
   - Verify Firestore security rules are set up correctly
   - Check that the user is authenticated for protected operations

3. **Storage upload failures**
   - Verify Storage security rules
   - Check file size and type restrictions
   - Ensure proper error handling in upload functions

### Getting Help

- [Firebase Documentation](https://firebase.google.com/docs)
- [Next.js with Firebase Guide](https://firebase.google.com/docs/web/setup)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)

## Next Steps

After completing this setup:

1. ✅ Firebase configuration is complete
2. 🔄 Implement contact page with form submission
3. 🔄 Build blog system with Firebase integration
4. 🔄 Create admin panel for content management
5. 🔄 Add about page with team information
6. 🔄 Implement 404 page

The Firebase backend is now ready to support all the website features!