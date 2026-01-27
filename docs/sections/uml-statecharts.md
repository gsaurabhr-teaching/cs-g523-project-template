# Lab 2 – System Context, Use Cases, and Behavioral Model (Group)
## Worked Example: Infusion Pump

> **Course:** CS G523 – Software for Embedded Systems  
> **Project:** Infusion Pump Controller  

---

## 1. System Boundary (Agreed)

### 1.1 Inside the System
- Infusion control logic
- Safety monitoring and fault detection
- Alarm generation and prioritization
- Motor actuation commands
- Logging of infusion and fault events

### 1.2 Outside the System
- Caregiver (user)
- Patient
- Flow sensor
- Occlusion sensor
- Door sensor
- Pump motor (actuator)
- Power supply

### 1.3 Assumptions
- Sensors provide periodic updates
- Caregiver responds to alarms
- Power loss can occur at any time
- Infusion parameters are configured before start

---

## 2. System Context

### 2.1 Actors and Interfaces

| Actor / Entity | Type | Interface Description |
|---------------|------|-----------------------|
| Caregiver | User | Start/stop commands, configuration, alarm acknowledgement |
| Flow Sensor | Sensor | Flow rate measurements |
| Occlusion Sensor | Sensor | Occlusion detected signal |
| Door Sensor | Sensor | Door open/closed status |
| Pump Motor | Actuator | Motor speed / on-off control |
| Power Supply | System | Power presence / loss |

---

### 2.2 System Context Diagram (Mermaid)

```mermaid
flowchart LR
    Caregiver -->|Commands / Acknowledge| Pump
    FlowSensor -->|Flow Rate| Pump
    OcclusionSensor -->|Occlusion Status| Pump
    DoorSensor -->|Door Status| Pump
    Pump -->|Motor Control| Motor
    Power -->|Power / Reset| Pump

    Pump[Infusion Pump Controller]
```

## 3. Selected Use Cases

| ID   | Use Case          | Actor            | Description                                      |
| ---- | ----------------- | ---------------- | ------------------------------------------------ |
| UC-1 | Start Infusion    | Caregiver        | Configure parameters and begin infusion          |
| UC-2 | Stop Infusion     | Caregiver        | Stop infusion manually during operation          |
| UC-3 | Handle Occlusion  | Occlusion Sensor | Detect blockage and stop infusion safely         |
| UC-4 | Handle Power Loss | Power Supply     | Transition system to safe state on power failure |

---

### 3.2 Use Case Descriptions

#### UC-1: Start Infusion
- Goal: Begin medication delivery.
- Trigger: Caregiver issues a start command.
- Main Interaction: Validate configuration → enable motor → begin monitoring.
- Outcome: System enters Infusing state.

#### UC-2: Stop Infusion
- Goal: Stop medication delivery safely on user request.
- Trigger: Caregiver issues a stop command.
- Main Interaction: Disable motor → stop infusion → log event.
- Outcome: System transitions from Infusing to Idle state.

#### UC-3: Handle Occlusion
- Goal: Prevent unsafe medication delivery.
- Trigger: Occlusion sensor detects blockage.
- Main Interaction: Immediately stop motor → raise alarm → log fault.
- Outcome: System enters Alarm, followed by Safe_Stop.

#### UC-4: Handle Power Loss
- Goal: Ensure patient safety during unexpected power loss.
- Trigger: Loss of external power.
- Main Interaction: Immediately stop infusion; system resets on power restoration.
- Outcome: System enters Safe_Stop state and does not resume infusion automatically.

---

## 4. UML Statechart (Behavioral Model)
```mermaid
stateDiagram-v2
    [*] --> Idle

    Idle --> Configured : ParametersConfigured
    Configured --> Infusing : StartCommand

    Infusing --> Idle : StopCommand

    Infusing --> Alarm : OcclusionDetected
    Infusing --> Alarm : DoorOpened

    Alarm --> Safe_Stop : StopInfusion

    Safe_Stop --> Idle : UserReset

    Idle --> Safe_Stop : PowerLoss
    Configured --> Safe_Stop : PowerLoss
    Infusing --> Safe_Stop : PowerLoss
    Alarm --> Safe_Stop : PowerLoss
```

---
## 5. Safety and Error Handling (Behavioral View)
- Safety events override normal operation.
- Infusion is always stopped before alarms are raised.
- Power loss forces a transition to Safe_Stop from any state.
- Recovery requires explicit caregiver action.

## 6. Relationship to Requirements
- Functional requirements map to Idle, Configured, and Infusing.
- Safety requirements map to Alarm and Safe_Stop.
- Power and fault requirements are enforced via global transitions.
- Each safety-critical requirement is enforced by at least one state or transition.

## 7. Change Log
| Date | Change          | Author  |
| ---- | --------------- | ------- |
|      | Initial version | Example |
