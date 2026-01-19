# MAD Infrastructure
## Secure Backend Migration & Orchestration (Zero-Trust Kubernetes)

This project demonstrates a secure, highly available, and automated migration of a Node.js backend to a Kubernetes environment, following a Zero-Trust security approach.

The goal is to showcase secure backend orchestration, identity-aware access control, automation, and production-ready Kubernetes design using modern DevSecOps practices.

## 🏗 Architecture Overview

The infrastructure is deployed on a dual-node Vagrant environment consisting of:

🔹 Master Node

Hosts core infrastructure services:

PostgreSQL – relational database

MinIO – object storage

Keycloak – Identity Provider (OIDC)

🔹 Worker Node

Runs application workloads:

Node.js Backend (scaled deployment)

OAuth2-Proxy for identity-aware access control

🔹 Ingress & Networking

Traefik Ingress Controller manages external routing

Public access via nip.io domains

Backend services exposed internally using ClusterIP only

## 🛡 Security & Resilience Features
🔐 Zero-Trust Authentication

Integrated OAuth2-Proxy with Keycloak (OIDC)

Every request is authenticated before reaching the backend

No direct access to backend services

⚙️ High Availability

Backend deployed with 3 replicas

podAntiAffinity ensures resilience in case of node failure

🔒 Internal Network Security

Replaced NodePort with ClusterIP

All traffic flows through Ingress → OAuth2-Proxy → Backend

💾 Data Persistence

PostgreSQL and MinIO configured with persistent storage

Data remains intact across pod restarts

## 🚀 Deployment Guide
1️⃣ Infrastructure Setup (Vagrant)

Start the virtual machines:
'''bash
vagrant up
'''

This provisions:

1 Kubernetes Master node

1 Kubernetes Worker node

2️⃣ Automated Backend Deployment (Ansible)

The backend build and deployment process is fully automated using Ansible.

cd /vagrant/ansible
ansible-playbook -i inventory.ini deploy-backend.yml

This playbook:
Builds the Docker image
Exports the image
Imports it into the containerd runtime on the worker node
Ensures consistent and repeatable deployments

3️⃣ Manual Kubernetes Deployment (Optional)

If deploying manually, apply the manifests in the following order:

## Secrets and database
kubectl apply -f kubernetes/postgres-secret.yaml
kubectl apply -f kubernetes/postgres.yaml

## OAuth2 Proxy and backend
kubectl apply -f kubernetes/oauth2-proxy-secret.yaml
kubectl apply -f kubernetes/oauth2-proxy.yaml
kubectl apply -f kubernetes/node-app.yaml
kubectl apply -f kubernetes/ingress.yaml

## 🔗 Service Access

Once deployed, services are accessible via Traefik Ingress:

Service	URL
Backend API	http://node.192.168.56.10.nip.io
Keycloak (IdP)	http://keycloak.192.168.56.10.nip.io
MinIO	http://minio.192.168.56.10.nip.io

## 🛠 Technology Stack
🔧 Orchestration & Automation

Kubernetes (v1.28+)
Ansible
Vagrant

## 🔐 Security & Identity
Keycloak (OIDC)
OAuth2-Proxy
Zero-Trust architecture principles

## ⚙️ Runtime & Platform

Node.js 18

Docker

containerd

💾 Data & Storage

PostgreSQL

MinIO

## 📅 Roadmap (Next Steps)

Planned improvements to enhance security and resilience:

🔐 Service Mesh: Integrate Istio for mTLS and encrypted internal traffic

🛡 Runtime Security: Deploy Falco for integrity and behavior monitoring

💾 Disaster Recovery: Implement Velero for automated backups (RTO: 2 hours)

🎯 Key Learning Outcomes

Secure Kubernetes backend migration

Identity-aware access control using OIDC

Zero-Trust networking principles

Automated and repeatable deployments

Production-oriented Kubernetes architecture



