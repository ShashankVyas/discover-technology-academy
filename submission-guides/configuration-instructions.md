## Hackathon Project Workspace Configuration Instructions

Two GitHub repositories are needed for your project:
1. External GitHub repository (github.com)
2. Internal Discover Enterprise GitHub repository (github.discoverfinancial.com)

Two Workstations are needed for your project:
1. Your personal Development Workstation
2. Your Discover Workstation

Due to Discover firewall and security policies, the project you will be creating cannot access the required services and endpoints from within the Discover network, so an external GitHub repository and a personal workstation are needed.  Once your project is done, it must be copied into the Discover network for judging.

### GitHub

Each team should assign an engineer to take the necessary steps to provision the team's project repository in the Discover Enterprise GitHub environment. 

Participants will need to make use of a predefined submission repository called a boilerplate, or “project template”, to quickly provision projects in a consistent manner.

To ensure a smooth development and submission process for your project, it is important to understand how to provision your GitHub repository. This repository will be required when you submit your project. 

### Identify Workstations

1. Determine which computer will be used as the **Development Workstation**. This needs to be a *personal computer* that is not connected to the Discover VPN.
2. Determine which computer will be used as the **Discover Workstation**. This needs to be a Discover provided computer that is connected to the Discover VPN.

### Create Repository

Please follow the these instructions for creating a ``` Team Workspace``` repository from a project template using a Development Workstation:

1. Using a [public GitHub account](https://github.com/) on a **personal computer**, navigate to the [TruCreds Event Repo Template](https://github.com/brycecurtis/dfs-trucreds-hackathon).
2. Above the file list, click `Use this template`.
3. Use the Owner drop-down menu, and select the account that will own this newly created repository. Hint: It should be assigned to a designated person on the team that will own the team's public GitHub repo.   
4. Type a name for your repository, and add a description (optional). **HINT**: The repo name should be same as your event Team Name.
5. Choose to make the new repository publicly visible.
6. Navigate to your new repository.
7. Update the README.md according to the instructions below in the [Update Readme section](https://github.com/brycecurtis/dfs-trucreds-hackathon/blob/main/submission-guides/configuration-instructions.md#update-readme).
8. Clone the Team Workspace repo to the Development Workstation

###  Pick an Event Track
Our hackathon, offers two (2) event tracks. Each participating team must select the track they will comepete within.

| Track | Description | Key Submission Artifacts | Required Skills |
| --- | --- | --- | --- | 
| **Digital Trust Ideation** | Identification and prototyping of a FinTech use case that has applicability to Discover. | Miro Board Link,Use Case Playback Brief (SCIPAB and/or What/Why/Wow,Persona, Empathy and Journey Maps, Business Lean Canvas), Sequence Diagrams, 2-min Concept Playback Video, 2-min Quick Prototype Video | Design Thinking, Business Acumen, Avast Tutorial Basics, UML |
| **Hack the Code** | Development of an end-to-end demonstration of a FinTech use case that has applicability to Discover. | Miro Board Link, Use Case Playback Brief (SCIPAB and/or What/Why/Wow,Persona, Empathy and Journey Maps, Business Lean Canvas), Sequence Diagrams, Demo Code, 2-min Concept Playback Video, 2-min Demo Video | Design Thinking, Business and Technical Acumen, Avast Development, UML |

### Update Readme
1. Open the repository using your favorite IDE (i.e. [Visual Studio Code][1], [Atom][2]).
2. Based on track selected, copy the appropriate `sample code` 

    ```
    $ cd <REPO_FOLDER>
    $ mkdir ./hackproject/code
    $ cp -Rv ./track/<SELECTION>/* ./hackproject/code/
    ```

    where:
    
    * REPO_FOLDER: Name of the local project folder
    * SELECTION: 
        * Digital Trust ideation: `dti`
        * Hack the Code: `htc`

3. Move `README.md` to the `archive` folder. Rename it to `ORIGINAL_INSTRUCTIONS.md`.

    ```
    $ mv -fv ./README.md ./archive/ORIGINAL_INSTRUCTIONS.md
    ```

4. Rename `SUBMISSION_README.md` to `README.md`

    ```
    $ mv -fv ./SUBMISSION_README.md ./README.md
    ```

5. Update new `README.md` according to the Template Instructions therein 

### Develop Solution
During the event publish all work to the Team Workspace. Follow these [submission instructions](./submission-instructions.md) prior to finalizing the team's project submission.  

[1]: https://code.visualstudio.com/
[2]: https://atom.io
