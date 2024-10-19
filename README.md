# kube-flow README

# Kube Flow

Kube Flow provides CodeLens to Kubernetes YAML resources that apply some basic `kubectl` commands: `apply`, `describe`, `get`, and `delete`.

## Features

Kube Flow enhances your Kubernetes development workflow by adding CodeLens actions directly to your YAML files. These actions allow you to quickly apply, describe, get, or delete Kubernetes resources without leaving your editor.

![Kube Flow in action](docs/assets/codelens.gif)

## Requirements

- Kubernetes CLI (`kubectl`) must be installed and configured.
- A valid kubeconfig file to connect to your Kubernetes cluster.

## Extension Settings

This extension contributes the following settings:

- `kubeFlow.enable`: Enable/disable Kube Flow.
- `kubeFlow.kubectlPath`: Path to the `kubectl` executable.

## Known Issues

- None at the moment. Please report any issues on the [GitHub repository](https://github.com/pedroKlein/kube-flow/issues).

## Release Notes

### 0.0.1

Initial release of Kube Flow.
