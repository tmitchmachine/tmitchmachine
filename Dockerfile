# Use the Python 3.9 slim image as the base image
FROM python:3.9-slim

# Set environment variables
ENV PYTHONUNBUFFERED True
ENV PORT 8080

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install production dependencies
RUN pip install Flask gunicorn

# Expose the port that Gunicorn will listen on
EXPOSE $PORT

# Command to run the web service on container startup using Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:$PORT", "main:app"]
