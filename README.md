# image_inspiration

This a webapp that takes in a query and presents a list of potential images. Users can then like and dislike images that suit their design taste.

### Instructions
1. Create and activate virtual environment
    - "python3 -m venv env" 
    - "source env/bin/activate" 
2. Install dependencies
    - "pip install -r /backend/requirements.txt"
3. Run backend
    - Navigate into /backend
    - "python manage.py runserver"
4. Navigate into /frontend and create a .env file with the following environment variables
    - VITE_API_URL="http://127.0.0.1:8000/"
    - VITE_UNSPLASH_ACCESS_KEY=unsplashed-access-key (obtain access key from https://unsplash.com/developers)
5. Run frontend
    - "npm run dev"
6. Access webapp at "http://localhost:5173/"
7. Create own account or use test account
    - username: testuser
    - password: testing12345