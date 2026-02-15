const stories = [
    {
        id: 'midnight_glitch',
        title: 'The Midnight Glitch',
        description: 'A life-support alarm is ringing on the ISS. Is it a real leak or just a bad sensor?',
        difficulty: 'Medium',
        subject: 'Systems Engineering',
        nodes: {
            start: {
                text: "The red alert light is pulsing on your console. Oxygen Scrubber #2 reports a 'Critical Pressure Drop'. You're the only one awake in the module. What's your first move?",
                speaker: "SYSTEM",
                speakerEmoji: "🚨",
                choices: [
                    { text: "Check the raw sensor data", next: 'check_sensors', xp: 5 },
                    { text: "Manually shut down the scrubber", next: 'shutdown_failure', color: 'danger', effect: 'lose_life' }
                ]
            },
            check_sensors: {
                text: "The telemetry shows a perfectly steady pressure on Scrubber #1, but Scrubber #2 is bouncing between 0 and 100 PSI every millisecond. This looks suspicious.",
                speaker: "Y-3PO (AI Assistant)",
                speakerEmoji: "🤖",
                choices: [
                    { text: "It's a sensor noise issue", next: 'sensor_fix', xp: 10 },
                    { text: "It's a physical pump cavitation", next: 'pump_check', xp: 10 }
                ]
            },
            shutdown_failure: {
                text: "You slapped the 'Kill Switch'. The sudden pressure surge from the backup system caused a pipe to rattle loose. Public safety is compromised. You lost a life!",
                speaker: "COMMANDER CHRIS",
                speakerEmoji: "👨‍✈️",
                choices: [
                    { text: "Try again (RESTART)", next: 'start' },
                    { text: "Exit Story", next: 'end' }
                ]
            },
            sensor_fix: {
                text: "Correct! Real physical systems don't change that fast without exploding. You recalibrate the signal filter, and the alarm clears. Great job, Rookie!",
                speaker: "CHIEF ENGINEER",
                speakerEmoji: "👷",
                choices: [
                    { text: "Finish Story", next: 'end', xp: 50 }
                ]
            },
            pump_check: {
                text: "You inspect the pump. It's vibrating, but otherwise fine. While you were distracted, the backup system struggled to cope. You wasted time.",
                speaker: "SYSTEM",
                speakerEmoji: "⚠️",
                choices: [
                    { text: "Re-examine sensors", next: 'check_sensors' }
                ]
            }
        }
    }
];

export default stories;
