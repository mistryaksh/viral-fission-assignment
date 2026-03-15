# Thumbnail Generator & Video Gallery

## Overview

A full-stack web application that allows users to upload videos, generate thumbnails from video frames, select a primary thumbnail, and browse uploaded videos through a searchable gallery.

## Tech Stack

### Frontend

* React
* Vite
* TypeScript
* Tailwind CSS
* Redux Toolkit Query

### Backend

* Node.js
* Express
* TypeScript
* MongoDB
* Multer
* FFmpeg
* Cloudflare R2

## Features

### Video Upload

* Upload video files with title, description, and tags
* Store uploaded video in Cloudflare R2
* Save metadata in MongoDB

### Thumbnail Generation

* Generate 3 thumbnails from real video frames using FFmpeg
* Upload generated thumbnails to Cloudflare R2
* Save thumbnails in database with score and primary thumbnail selection

### Thumbnail Selection

* Select any generated thumbnail as primary thumbnail

### Video Gallery

* Display uploaded videos
* Search by title
* Filter by tag
* Pagination support

### Video Detail Page

* Native video player
* Title, description, tags
* All thumbnails displayed
* Primary thumbnail highlighted

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

### Backend `.env`

```env
PORT=8080
MONGO_DB=your_mongodb_connection
R2_ACCESS_KEY=your_access_key
R2_SECRET_KEY=your_secret_key
R2_BUCKET=your_bucket_name
R2_ENDPOINT=your_r2_endpoint
R2_PUBLIC_URL=your_public_r2_url
```

### Frontend `.env`

```env
VITE_SERVER_URL=http://localhost:8080
```

## API Endpoints

### Upload Video

```http
POST /api/v1/video
```

### Get Videos

```http
GET /api/v1/video?search=&tag=&page=&limit=
```

### Get Video Detail

```http
GET /api/v1/video/:id
```

### Generate Thumbnails

```http
POST /api/v1/video/:id/thumbnails/generate
```

### Select Primary Thumbnail

```http
POST /api/v1/video/:id/thumbnails/select
```

## Design Notes

### Architecture

The application follows a layered backend structure:

* Routes
* Controllers
* Services
* Models
* Utilities

### Database Schema

Video document stores:

* title
* description
* tags
* videoUrl
* thumbnails array

### Thumbnail Generation

Real thumbnail extraction is implemented using FFmpeg by capturing frames from uploaded videos at fixed timestamps.

### Search & Filtering

Implemented on the backend using MongoDB query filters.

### Trade-offs

Local temporary files are used during thumbnail generation before uploading generated assets to Cloudflare R2 for simplicity and faster implementation.
