# Use the Python 3.9 slim image as the base image
FROM python:3.9-slim

# Allow statements and log messages to immediately appear in the Knative logs
ENV PYTHONUNBUFFERED True

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install production dependencies
RUN pip install Flask gunicorn

# Expose the port that Gunicorn will listen on
EXPOSE 8080

# Command to run the web service on container startup
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "app:app"]
