## Project Overview

This project demonstrates the design and implementation of a
real-time, event-driven embedded software system.
The focus is on disciplined software engineering practices rather
than user-interface development.

The system is designed to operate under strict timing, reliability,
and resource constraints, typical of safety- and mission-critical
embedded systems.

## Objectives

- Design a modular embedded software architecture
- Apply formal requirements engineering and traceability
- Use event-driven and concurrent programming models
- Demonstrate correctness through testing and verification
- Build a system suitable for deployment on constrained hardware

## Target Platform

The system targets a resource-constrained embedded platform
with real-time requirements. Hardware-specific choices are abstracted
to enable portability and testability.

![Embedded system context diagram](https://upload.wikimedia.org/wikipedia/commons/3/3f/Embedded_systems_block_diagram.png)

*Figure 1: High-level context of the embedded system showing interaction with sensors and actuators.*

## Layered Software Architecture

![Embedded software stack](https://upload.wikimedia.org/wikipedia/commons/6/60/Embedded_system_software_stack.svg)

The software is organized into clearly separated layers:
hardware abstraction, core services, and application logic.
This separation improves portability, testability, and long-term
maintainability.

## Event-Driven Component Interaction

![Event-driven architecture diagram](https://upload.wikimedia.org/wikipedia/commons/0/03/Event-driven_architecture.svg)

Events decouple producers from consumers, enabling scalable concurrency
and simplifying reasoning about system behavior under load and fault
conditions.     