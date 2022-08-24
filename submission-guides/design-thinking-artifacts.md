# Design Thinking Guide

The instructions herein provide guidance on how a participating hackathon team can get started on the delivery of the requirements for their selected event track. 

>NOTE: These instructions are applicable to both event tracks.
## Prerequisite Educational

The following plenary sessions are recommended before beginning the hackathon. Please refer to the [Participant Guide](https://angelhack.notion.site/TruCreds-Hack-A-Digital-Trust-Hackathon-7e74d78809fb4a56bb9f898b48007464) for the schedule of sessions. 

* Design Thinking Experience

Familiarity with UML sequence diagrams is suggested:

* [What is a Sequence Diagram?](https://en.wikipedia.org/wiki/Sequence_diagram)
* [Why use UML Sequence Diagrams?](https://www.lucidchart.com/pages/uml-sequence-diagram)
* [PlantUML Tutorial](https://plantuml.com/sequence-diagram)

It is **highly recommended** review the [sample use case stories](./../HELP.md#digital-trust-use-cases) so that they can gain an understanding of the expectations of the judges.

## Sample Material
The following resources provide a bootstrap for participating hackers.

| Template | Description |
| --- | --- |
| Design Thinking Miro Board Template - I **Have** an Idea | [I Have an Idea - Innovation Accelerator TruCreds Workshop Template](https://miro.com/app/dashboard/?tpTemplate=uXjVOmSchyk%3D&isCustom=true&share_link_id=923512925225) |
| Design Thinking Miro Board Template - I **Need** an Idea | [I Need an Idea - Innovation Accelerator TruCreds Workshop Template](https://miro.com/app/dashboard/?tpTemplate=uXjVOmSTX18%3D&isCustom=true&share_link_id=500327005307) |
| Use Case Story | [Story template](../designs/story-template.md) |
| Design Thinking Playback Template | [PowerPoint Template Download](https://discoverfinancial.sharepoint.com/:p:/s/TCI-Innovation/EfcdhWb8qxRGlSNyRQjt2sEBqrwKtnnUpef5Ja4pKY4Atg?e=qUrfOR)

## Exit Criteria
Upon successful completion of this guide, the following hackathon checklist requirements will be produced:

| Artifact | Description |
| --- | --- |
| Design Thinking Miro Board | URL to whiteboard used for team brainstorming. |
| Use Case Story | Markdown file describing the use case with support by UML diagrams. 
| Design Thinking Playback Brief | PowerPoint Presentation used to convey results of Design Thinking activities. This presentation *should* be used for the creation of the 2-min Concept Video. |

## Instructions
### Design Thinking Day

The Design Thinking day is for you and your team to take time ***before*** the Hackathon to use Design Thinking templates that are being provided to help you during the hackathon, as well as to help you prepare the presentation for your project.

**Use our Design Thinking Miro templates to help you:**
* Brainstorm a **new** idea or jump start an **existing** idea
* Empathize with your users
* Gain a better understanding of the problem your trying to solve
* Identify and document your use case story
* Understand where you should focus your time
* Fast track your presentation

### Design Thinking Day Assets

**Use the Miro templates listed below that best fits your needs:**
* [I Have an Idea](https://miro.com/app/dashboard/?tpTemplate=uXjVOmSchyk%3D&isCustom=true&share_link_id=923512925225)
* [I Need a Idea](https://miro.com/app/dashboard/?tpTemplate=uXjVOmSTX18%3D&isCustom=true&share_link_id=500327005307)

**If you need help understanding any of the exercises, please refer to any of the follow:**
* [Video of a team going through all the exercises](https://web.microsoftstream.com/video/deb6f4ce-1b36-4450-8b7a-5d87b95c4c79)
```Note: At the beginning of each exercise a facilitator describes the method. There are also time codes in the video details that let you skip to sections with the specific methods.```  
* [Example of a completed Design Thinking Miro Template
](https://miro.com/app/board/uXjVOmu96Eg=/?share_link_id=356831181625)  
* [Design Thinking Mentor Teams Channel](https://teams.microsoft.com/l/channel/19%3a5c32432aa67a4cf88aab70f1e17f87fe%40thread.tacv2/Design%2520Thinking%2520Mentor%2520Support?groupId=f7fa8db9-931d-488c-a84a-1895011b252f&tenantId=f3f068cf-080c-4824-a912-f8c4633bd454)
    
Friday, August 19th is designated as the Design Thinking Day and should be used by your team to prepare for the event. Design Thinking mentors will be available between 8:00AM-4:00PM Central on [Teams](https://teams.microsoft.com/l/channel/19%3a5c32432aa67a4cf88aab70f1e17f87fe%40thread.tacv2/Design%2520Thinking%2520Mentor%2520Support?groupId=f7fa8db9-931d-488c-a84a-1895011b252f&tenantId=f3f068cf-080c-4824-a912-f8c4633bd454)
 

### Use Case Story

The objective here is to develop a human readable use case that can be easily consumed by business and technical readers. 

#### Develop UML

1. Pick a UML design tool (LucidCarts, PlantUML, other). Refer to [suggested tools](../submission-guides/tools.md).
2. Create a sequence diagram image and store it in the `./designs/images/uml` folder. Since diagram are often modified/altered, it is advised that you store the source files used to produce the diagram in the `./designs/src` folder.
3. Sometimes, a single diagram is too busy and would benefit from segmenting the steps into multiple diagrams. If multiple diagram are required, repeat `Step 2` for each required diagram. 
#### Develop Story

1. Make a copy of the provided story template file by replacing USECASE_NAME with the name of the team's use case.
   
   ```
   $ cp ./designs/story-template.md ./designs/USECASE_NAME.md 
   ```
2. Edit the story using the provided outline as a guide. Follow the provided inline template instructions. Feel free to augment the outline as needed. Leverage the `./designs/images` resources as directed. 

### Playback Brief

To help you streamline creating a presentation for your hackathon project, we have created a PowerPoint template for you to use. The outline of this template follows exercises found in the Design Thinking Miro Templates, so make sure to take advantage of those!

[Download the PowerPoint Template](https://discoverfinancial.sharepoint.com/:p:/s/TCI-Innovation/EfcdhWb8qxRGlSNyRQjt2sEBqrwKtnnUpef5Ja4pKY4Atg?e=qUrfOR)






