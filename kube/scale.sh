#!/bin/bash
kubectl apply -f kube
kubectl scale --replicas=2 deployment/blog
kubectl get pods -l app=blog --watch
minikube service blog



# List of Commands
Master Node
kubeadm init --apiserver-advertise-address $(hostname -i)

mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config


# ADD USER
useradd dipto -G sudo -m -s /bin/bash
passwd dipto

cd $HOME