<div class="mermaid">
stateDiagram-v2
    [*] --> Init
    Init --> Running : start_event
    Running --> Fault : error_detected
    Fault --> Safe : enter_safe_state
</div>