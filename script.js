
        const windowSizeElement = document.getElementById('windowSize');
        let smart = 0;
        let strong = 0;
        let curious = 0;
        let finalResult = '';
        let key = false;
        let relic = false;
        let defeated = false;
        let dead = false;

        // Function to update window size
        function updateWindowSize() {
            const windowHeight = window.innerHeight;
            const windowWidth = window.innerWidth;
            windowSizeElement.textContent = `Window Size: ${windowHeight}px x ${windowWidth}px`;
            console.log('Window Height:', windowHeight, 'Window Width:', windowWidth);

                // Update device type based on window width
            const deviceTypeElement = document.getElementById('deviceType');
            if (windowWidth <= 768) {
                deviceTypeElement.textContent = 'Device Type: Mobile';
            } else if (windowWidth <= 1024) {
                deviceTypeElement.textContent = 'Device Type: Tablet';
            } else {
                deviceTypeElement.textContent = 'Device Type: Desktop';
            }
        }

        // Set initial window size
        updateWindowSize();

        // Scroll to the next section
        function scrollToNextSection(currentSection) {
            const nextSection = currentSection.nextElementSibling;
            if (nextSection) {
                setTimeout(() => {
                    nextSection.scrollIntoView({ behavior: 'smooth' });

                    setTimeout(() => {
                        unlockSections();
                    }, 600);
                }, 3000); // Delay of 1000ms before scrolling
            }
        }


        function scrollToNextSectionSmart(currentSection) {
            const nextSection = currentSection.nextElementSibling;
            smart++;
            if (nextSection) {
                setTimeout(() => {
                    nextSection.scrollIntoView({ behavior: 'smooth' });

                    setTimeout(() => {
                        unlockSections();
                    }, 600);
                }, 5000); // Delay of 500ms before scrolling
            }
        }

        function scrollToNextSectionStrong(currentSection) {
            const nextSection = currentSection.nextElementSibling;
            strong++;
            if (nextSection) {
                setTimeout(() => {
                    nextSection.scrollIntoView({ behavior: 'smooth' });

                    setTimeout(() => {
                        unlockSections();
                    }, 600);
                }, 5000); // Delay of 1000ms before scrolling
            }
        }

        function scrollToNextSectionCurious(currentSection) {
            const nextSection = currentSection.nextElementSibling;
            curious++;
            if (nextSection) {
                setTimeout(() => {
                    nextSection.scrollIntoView({ behavior: 'smooth' });

                    setTimeout(() => {
                        unlockSections();
                    }, 600);
                }, 5000); // Delay of 1000ms before scrolling
            }
        }

        // Function to hide the loading screen
            window.addEventListener('load', function() {
                setTimeout(function() {
                    const loadingScreen = document.getElementById('loading-screen');
                    loadingScreen.classList.add('hidden');

                    updateScrollProgress();
                    unlockSections();

                }, 1500);
            });

        let warningActive = false;

        function bossWarning() {
            if (warningActive) return;
            warningActive = true;

            const warningScreen = document.getElementById('warning-screen');
            warningScreen.style.display = "flex";

            // Remove after animation completes
            setTimeout(() => {
                warningScreen.style.display = "none";
                warningActive = false;
            }, 4000); // 0.8s × 3
        }

        // Function to update the result text based on user selection
        function selectOption(choice) {
            let resultText = '';

            if (choice === 'book') {
                resultText = 'You feel smarter';
            } else if (choice === 'stick') {
                resultText = 'You feel stronger';
            } else if (choice === 'key') {
                resultText = 'This might be useful later';
                key = true;
            }

            document.getElementById('result').textContent = resultText;
        }

        // Function for path selection in Section 2
        function choosePath(path) {
            let pathText = '';
            let additionalText = '';
            if (path === 'left') {
                pathText = 'You walk down the left path and browse through ancient scrolls in the academy';
            } else if (path === 'center') {
                pathText = 'You take the center path and participate in a fierce battle in the arena!';
            } else if (path === 'right') {
                pathText = 'You venture right and learn about the history of the world in the museum!\n';
                if(key){
                    additionalText = 'The key you found opens a locked chest in the museum, revealing a powerful artifact!';
                    relic = true;
                }
            }
            document.getElementById('path-result').textContent = pathText;
            document.getElementById('additional-result').textContent = additionalText;
        }

        function bossFight(action){
            let fightText = '';
            let additionalText = '';
            let saved = '';
            
            if (action === 'weakness-academic') {
                fightText = "You try to think of any weaknesses an Infernal golem has from your studies"
                if(smart > 2) {
                    additionalText = "You exploit the golem's weakness which you learned from your time studying.";
                } else {
                    additionalText = "Unfortunately you could not think of what its weakness could be. You are then defeated";
                    if (!relic){
                        dead = true;
                        defeated = true;
                    } else {
                        saved = "The relic you were holding activates and disintegrates the golem, the relic disappears"
                        defeated = true;
                        relic = false;
                    }
                }
            } else if (action === 'fight') {
                fightText = 'You charge the golem and attempt to beat it in a fight';
                if(strong > 2) {
                    additionalText = "After a long fight you manage to defeaet the golem";
                } else {
                    additionalText = "Despite your best efforts you were not strong enough to defeat the golem";
                    if (!relic){
                        dead = true;
                        defeated = true;
                    } else {
                        saved = "The relic you were holding activates and disintegrates the golem, the relic disappears"
                        defeated = true;
                        relic = false;
                    }
                }
            } else if (action === 'weakness-intuit') {
                fightText = "You try and figure out what the golem's weakness is";
                if(curious > 2) {
                    additionalText = "You manage to figure out the golem's weakness and defeat it";
                } else {
                    additionalText = "You just can't figure out what the golem could be weak to. You are defeateed";
                    if (!relic){
                        dead = true;
                        defeated = true;
                    } else {
                        saved = " The relic you were holding activates and disintegrates the golem, the relic disappears"
                        defeated = true;
                        relic = false;
                    }
                }
            }
            document.getElementById('fight-result').textContent = fightText;
            document.getElementById('additional-fight-result').textContent = additionalText;
            document.getElementById('saved?').textContent = saved;

            determineFinalResult();
        }

        // Function for teaching in Section 3
        function teachMe(lesson) {
            let teachText = '';
            if (lesson === 'academics') {
                teachText = 'You learn about ancient history and lore!';
            } else if (lesson === 'techniques') {
                teachText = 'You learn fighting techniques!';
            } else if (lesson === 'adventuring') {
                teachText = 'You learn about the art of adventuring!';
            }
            document.getElementById('lesson-result').textContent = teachText;
            bossWarning();
            
        }



        // Function for action in Section 4
        function makeChoice(action) {
            let actionText = '';
            if (action === 'learn') {
                actionText = 'You continue to learn and expand your knowledge about this world eventually becoming a renowned scholar!';
            } else if (action === 'fight') {
                actionText = 'You continue to train and become stronger, eventually becoming the champion of the arena!';
            } else if (action === 'explore') {
                actionText = 'You continue to explore and discover hidden secrets, eventually becoming a legendary adventurer!';
            }
            determineFinalResult();
            document.getElementById('action-result').textContent = actionText;
        }

        // Function to determine the final result based on user choices
        function determineFinalResult() {
            let additionalText = '';

            if (smart >= 3) {
                finalResult = 'a Scholar';
            } else if (strong >= 3) {
                finalResult = 'a Warrior';
            } else if (curious >= 3) {
                finalResult = 'an Adventurer';
            } else {
                finalResult = 'a Wanderer';
            }
            
            if (relic) {
                additionalText = "You still don't know what the relic is for";
            }   

            if(dead){
                additionalText = "Unfortunately you have died during your adventure";
            } else if(defeated && !dead) {
                additionalText = "Unfortunately you did not defeat the golem, at least you're still alive"
            } else {
                additionalText += "";
            }
            document.getElementById('final-result').textContent = finalResult;
            document.getElementById('additionalFluff').textContent = additionalText;
        }

        
        function updateScrollProgress() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;

            if (docHeight <= 0) return;

            const scrollPercent = (scrollTop / docHeight) * 100;
            document.getElementById("progress-bar").style.width = scrollPercent + "%";

            unlockSections();

            const bossSection = document.querySelector(".section-4");
            const rect = bossSection.getBoundingClientRect();

            if (rect.top < window.innerHeight * 0.5 && !bossWarningTriggered) {
                bossWarningTriggered = true;
                bossWarning();
            }
        }


        window.addEventListener("resize", throttle(updateWindowSize, 200));

        function unlockSections() {
            const sections = document.querySelectorAll("section");

            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.8) {
                    section.classList.add("unlocked");
                }
            });
        }


        window.addEventListener("scroll", throttle(updateScrollProgress, 100));

        function throttle(func, limit) {
            let lastCall = 0;
            return function () {
                const now = Date.now();
                if (now - lastCall >= limit) {
                    lastCall = now;
                    func();
                }
            };
        }

        