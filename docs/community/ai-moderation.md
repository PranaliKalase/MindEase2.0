# 🤖 AI Safety Pipeline & Moderation Engine

## 1. Multi-Tier AI Scanning Engine

Every post, reply, and uploaded image passes through the MindEase AI Safety Pipeline before public visibility.

### Risk Classifications & Actions:

| Risk Tier | Score Threshold | Trigger Signals | Automated System Action |
| :--- | :--- | :--- | :--- |
| **Low Risk** | 0.0 - 0.25 | Safe thoughts, gratitude, general questions | Direct publish to community feed immediately. |
| **Medium Risk** | 0.26 - 0.60 | Sensitive topics (grief, work stress, mild sadness) | Publish with automatic Content Warning (CW) fold & AI Summary. |
| **High Risk** | 0.61 - 0.85 | Aggressive language, medical advice claims, toxic phrasing | Hold in Moderator Queue for human review before publishing. |
| **Critical** | 0.86 - 1.00 | Explicit self-harm intent, crisis signals, hate speech | Block publication, trigger immediate Crisis Helpline Modal, notify safety team. |

---

## 2. Crisis Helpline Trigger Protocol

When content scores `Critical` ($>0.85$ self-harm or suicide signal):
1. The post is NOT published publicly.
2. The user's screen displays a warm, empathetic Crisis Resource Overlay:
   - *"We hear you, and you are not alone. MindEase cares deeply about your safety."*
   - Direct 1-tap call button to 988 Suicide & Crisis Lifeline / local crisis hotlines.
   - 1-tap connection to an AI grounding session or Peer Support Buddy.
3. An urgent alert is routed to human safety supervisors.
