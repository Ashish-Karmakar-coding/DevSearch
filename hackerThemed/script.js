 // Matrix rain effect
        const canvas = document.getElementById('matrix-rain');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const symbols = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
        
        const alphabet = katakana + latin + nums + symbols;
        
        const fontSize = 16;
        const columns = canvas.width / fontSize;
        
        const rainDrops = [];
        
        for (let x = 0; x < columns; x++) {
            rainDrops[x] = 1;
        }
        
        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00FF00';
            ctx.font = fontSize + 'px Courier New';
            
            for (let i = 0; i < rainDrops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
                
                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        };
        
        setInterval(draw, 30);

        // Settings functionality
        let settings = {
            primaryColor: '#33ff33',
            backgroundColor: '#000000',
            secondaryColor: '#111111',
            timezone: 'local',
            matrixRain: true,
            clockGlitch: true,
            terminalMessages: true,
            youtubeLink: 'https://youtube.com',
            githubLink: 'https://github.com',
            emailLink: 'https://mail.google.com'
        };

        // Load settings from localStorage
        function loadSettings() {
            const savedSettings = localStorage.getItem('hackerTerminalSettings');
            if (savedSettings) {
                settings = { ...settings, ...JSON.parse(savedSettings) };
            }
            applySettings();
        }

        // Save settings to localStorage
        function saveSettings() {
            localStorage.setItem('hackerTerminalSettings', JSON.stringify(settings));
        }

        // Apply settings to the interface
        function applySettings() {
            // Update CSS variables
            document.documentElement.style.setProperty('--hacker-green', settings.primaryColor);
            document.documentElement.style.setProperty('--hacker-dark', settings.backgroundColor);
            document.documentElement.style.setProperty('--hacker-gray', settings.secondaryColor);
            
            // Update quick links
            const youtubeLink = document.querySelector('.quick-link[href*="youtube"]');
            const githubLink = document.querySelector('.social-link[href*="github"]');
            if (youtubeLink) youtubeLink.href = settings.youtubeLink;
            if (githubLink) githubLink.href = settings.githubLink;
            
            // Update matrix rain
            if (!settings.matrixRain) {
                canvas.style.display = 'none';
            } else {
                canvas.style.display = 'block';
            }
            
            // Update settings form
            document.getElementById('primary-color').value = settings.primaryColor;
            document.getElementById('bg-color').value = settings.backgroundColor;
            document.getElementById('secondary-color').value = settings.secondaryColor;
            document.getElementById('timezone-select').value = settings.timezone;
            document.getElementById('matrix-toggle').checked = settings.matrixRain;
            document.getElementById('glitch-toggle').checked = settings.clockGlitch;
            document.getElementById('terminal-toggle').checked = settings.terminalMessages;
            document.getElementById('youtube-link').value = settings.youtubeLink;
            document.getElementById('github-link').value = settings.githubLink;
            document.getElementById('email-link').value = settings.emailLink;
        }

        // Initialize settings
        loadSettings();

        // Settings event listeners
        document.getElementById('save-settings').addEventListener('click', () => {
            settings.primaryColor = document.getElementById('primary-color').value;
            settings.backgroundColor = document.getElementById('bg-color').value;
            settings.secondaryColor = document.getElementById('secondary-color').value;
            settings.timezone = document.getElementById('timezone-select').value;
            settings.matrixRain = document.getElementById('matrix-toggle').checked;
            settings.clockGlitch = document.getElementById('glitch-toggle').checked;
            settings.terminalMessages = document.getElementById('terminal-toggle').checked;
            settings.youtubeLink = document.getElementById('youtube-link').value;
            settings.githubLink = document.getElementById('github-link').value;
            settings.emailLink = document.getElementById('email-link').value;
            
            saveSettings();
            applySettings();
            
            // Show save confirmation
            const saveBtn = document.getElementById('save-settings');
            const originalText = saveBtn.textContent;
            saveBtn.textContent = 'SAVED!';
            saveBtn.style.background = settings.primaryColor;
            saveBtn.style.color = settings.backgroundColor;
            setTimeout(() => {
                saveBtn.textContent = originalText;
                saveBtn.style.background = '';
                saveBtn.style.color = '';
            }, 1000);
        });

        document.getElementById('reset-settings').addEventListener('click', () => {
            settings = {
                primaryColor: '#33ff33',
                backgroundColor: '#000000',
                secondaryColor: '#111111',
                timezone: 'local',
                matrixRain: true,
                clockGlitch: true,
                terminalMessages: true,
                youtubeLink: 'https://youtube.com',
                githubLink: 'https://github.com',
                emailLink: 'https://mail.google.com'
            };
            saveSettings();
            applySettings();
        });

        // Calendar functionality
        let currentDate = new Date();
        let selectedDate = new Date();

        function renderCalendar() {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const startDate = new Date(firstDay);
            startDate.setDate(startDate.getDate() - firstDay.getDay());
            
            const monthNames = [
                'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
                'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
            ];
            
            document.getElementById('calendar-title').textContent = `${monthNames[month]} ${year}`;
            
            const calendarDays = document.getElementById('calendar-days');
            calendarDays.innerHTML = '';
            
            const today = new Date();
            
            for (let i = 0; i < 42; i++) {
                const date = new Date(startDate);
                date.setDate(startDate.getDate() + i);
                
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day';
                dayElement.textContent = date.getDate();
                
                // Check if it's today
                if (date.toDateString() === today.toDateString()) {
                    dayElement.classList.add('today');
                }
                
                // Check if it's from other month
                if (date.getMonth() !== month) {
                    dayElement.classList.add('other-month');
                }
                
                // Check if it's selected
                if (date.toDateString() === selectedDate.toDateString()) {
                    dayElement.classList.add('selected');
                }
                
                dayElement.addEventListener('click', () => {
                    selectedDate = new Date(date);
                    renderCalendar();
                });
                
                calendarDays.appendChild(dayElement);
            }
        }

        // Initialize calendar
        renderCalendar();

        // Calendar navigation
        document.getElementById('prev-month').addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });

        document.getElementById('next-month').addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });

        // Clock with timezone support
        function updateClock() {
            const now = new Date();
            let timeToShow;
            
            if (settings.timezone === 'local') {
                timeToShow = now;
            } else if (settings.timezone === 'UTC') {
                timeToShow = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
            } else {
                // For other timezones, we'll use a simple offset calculation
                // In a real app, you'd use a proper timezone library
                timeToShow = now;
            }
            
            const hours = String(timeToShow.getHours()).padStart(2, '0');
            const minutes = String(timeToShow.getMinutes()).padStart(2, '0');
            const seconds = String(timeToShow.getSeconds()).padStart(2, '0');
            
            document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
            
            // Occasionally "glitch" the clock for hacking effect (if enabled)
            if (settings.clockGlitch && Math.random() < 0.01) {
                document.getElementById('clock').textContent = 
                    `${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)}:${Math.floor(Math.random() * 60)}`;
                setTimeout(updateClock, 100);
            } else {
                setTimeout(updateClock, 1000);
            }
        }
        
        updateClock();

        // Terminal typing effect (if enabled)
        const commands = [
            "SCANNING NETWORK...",
            "ESTABLISHING SECURE CONNECTION...",
            "RETRIEVING DATA...",
            "COMPILING CODE...",
            "RUNNING DIAGNOSTICS...",
            "ACCESSING CACHE...",
            "OPTIMIZING PERFORMANCE..."
        ];
        
        function randomCommand() {
            if (!settings.terminalMessages) return;
            
            const terminalText = document.querySelector('.terminal-text');
            const newLine = document.createElement('div');
            newLine.className = 'terminal-line';
            
            newLine.innerHTML = `<span class="command">SYSTEM:</span> ${commands[Math.floor(Math.random() * commands.length)]}`;
            
            terminalText.appendChild(newLine);
            
            // Keep only last 5 lines
            while (terminalText.children.length > 5) {
                terminalText.removeChild(terminalText.firstChild);
            }
            
            setTimeout(randomCommand, 5000 + Math.random() * 10000);
        }
        
        setTimeout(randomCommand, 3000);

        // TODO List Functionality
        let isDragging = false;
        let offsetX, offsetY;
        
        const todoSidebar = document.getElementById('todo-sidebar');
        
        document.querySelector('.todo-header').addEventListener('mousedown', (e) => {
            isDragging = true;
            const rect = todoSidebar.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            todoSidebar.style.left = `${e.clientX - offsetX}px`;
            todoSidebar.style.top = `${e.clientY - offsetY}px`;
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        document.getElementById('todo-toggle').addEventListener('click', (e) => {
            todoSidebar.classList.toggle('active');
            if (todoSidebar.classList.contains('active')) {
                const btnRect = e.target.getBoundingClientRect();
                todoSidebar.style.left = `${btnRect.left}px`;
                todoSidebar.style.top = `${btnRect.bottom + 10}px`;
            }
        });

        document.getElementById('close-todo').addEventListener('click', (e) => {
            e.stopPropagation();
            document.getElementById('todo-sidebar').classList.remove('active');
        });

        document.getElementById('add-todo').addEventListener('click', addTodo);
        document.getElementById('todo-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTodo();
        });

        function addTodo() {
            const input = document.getElementById('todo-input');
            const task = input.value.trim();
            if (task) {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${task}</span>
                    <button class="delete-todo">X</button>
                `;
                document.getElementById('todo-list').appendChild(li);
                input.value = '';
                
                li.querySelector('.delete-todo').addEventListener('click', () => {
                    li.remove();
                });
            }
        }

        // Calendar Sidebar Functionality
        let isCalendarDragging = false;
        let calendarOffsetX, calendarOffsetY;
        
        const calendarSidebar = document.getElementById('calendar-sidebar');
        
        document.querySelector('.calendar-header').addEventListener('mousedown', (e) => {
            isCalendarDragging = true;
            const rect = calendarSidebar.getBoundingClientRect();
            calendarOffsetX = e.clientX - rect.left;
            calendarOffsetY = e.clientY - rect.top;
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isCalendarDragging) return;
            calendarSidebar.style.left = `${e.clientX - calendarOffsetX}px`;
            calendarSidebar.style.top = `${e.clientY - calendarOffsetY}px`;
        });

        document.addEventListener('mouseup', () => {
            isCalendarDragging = false;
        });

        document.getElementById('calendar-toggle').addEventListener('click', (e) => {
            calendarSidebar.classList.toggle('active');
            if (calendarSidebar.classList.contains('active')) {
                const btnRect = e.target.getBoundingClientRect();
                calendarSidebar.style.left = `${btnRect.left}px`;
                calendarSidebar.style.top = `${btnRect.bottom + 10}px`;
            }
        });

        document.getElementById('close-calendar').addEventListener('click', (e) => {
            e.stopPropagation();
            document.getElementById('calendar-sidebar').classList.remove('active');
        });

        // Settings Sidebar Functionality
        let isSettingsDragging = false;
        let settingsOffsetX, settingsOffsetY;
        
        const settingsSidebar = document.getElementById('settings-sidebar');
        
        document.querySelector('.settings-header').addEventListener('mousedown', (e) => {
            isSettingsDragging = true;
            const rect = settingsSidebar.getBoundingClientRect();
            settingsOffsetX = e.clientX - rect.left;
            settingsOffsetY = e.clientY - rect.top;
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isSettingsDragging) return;
            settingsSidebar.style.left = `${e.clientX - settingsOffsetX}px`;
            settingsSidebar.style.top = `${e.clientY - settingsOffsetY}px`;
        });

        document.addEventListener('mouseup', () => {
            isSettingsDragging = false;
        });

        document.getElementById('settings-toggle').addEventListener('click', (e) => {
            settingsSidebar.classList.toggle('active');
            if (settingsSidebar.classList.contains('active')) {
                const btnRect = e.target.getBoundingClientRect();
                settingsSidebar.style.left = `${btnRect.right - 400}px`;
                settingsSidebar.style.top = `${btnRect.bottom + 10}px`;
            }
        });

        document.getElementById('close-settings').addEventListener('click', (e) => {
            e.stopPropagation();
            document.getElementById('settings-sidebar').classList.remove('active');
        });