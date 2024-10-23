# Multi-threaded Node.js Application

## Overview

This is a multi-threaded Node.js application that processes data from a MySQL database using worker threads. It fetches rows from the database, assigns tasks to workers for processing, and checks for new data every 10 seconds. The application is designed to efficiently handle large datasets by leveraging the power of concurrent processing.

## Features

- **Multi-threading**: Utilizes worker threads for parallel processing of tasks.
- **Database Interaction**: Connects to a MySQL database and fetches data for processing.
- **Cron Job**: Periodically checks for new data in the database every 10 seconds.
- **Docker Support**: Can be run inside a Docker container.

## Prerequisites

- Node.js (version 14 or higher)
- MySQL database
- Docker (for containerization)

## Installation
``bash
git clone https://github.com/BhonePyae159/node_multi_tasking.git


