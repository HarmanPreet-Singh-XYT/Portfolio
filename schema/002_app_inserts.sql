-- +goose Up
--
-- Data for app: screentime
--
INSERT INTO app_details (id, name, icon, is_private, header_image, trailer_url, description, demo_link, short_description, has_in_app_purchases) VALUES
('screentime', 'TimeMark - Track Screen Usage & App Usage', '/screentime/logo.png', FALSE, '/screentime/screentime.png', NULL, '', 'https://apps.microsoft.com/store/detail/9PHBZXNPVHSQ?cid=DevShareMCLPCS', 'Monitor your screen time, analyze app usage trends, and set limits to boost productivity. Your data stays private on your device.', FALSE);

INSERT INTO card_details (app_id, image, type, title, description) VALUES
('screentime', '/screentime/1.png', 'development + design', 'TimeMark - Track Screen Time & App Usage', 'Monitor your screen time, analyze app usage trends, and set limits to boost productivity. Your data stays private on your device.');

INSERT INTO card_tech (app_id, tech) VALUES
('screentime', 'Dart'), ('screentime', 'Flutter'), ('screentime', 'Figma'), ('screentime', 'C++'), ('screentime', 'Windows'), ('screentime', 'Visualization'), ('screentime', 'Microsoft Store');

INSERT INTO buttons_config (app_id, wishlist, share, demo) VALUES
('screentime', FALSE, TRUE, TRUE);

INSERT INTO screenshots (app_id, url) VALUES
('screentime', '/screentime/1.png'), ('screentime', '/screentime/2.png'), ('screentime', '/screentime/3.png'), ('screentime', '/screentime/4.png'), ('screentime', '/screentime/5.png'), ('screentime', '/screentime/6.png');

INSERT INTO tech_stack (app_id, technology) VALUES
('screentime', 'Flutter'), ('screentime', 'C++'), ('screentime', 'WinAPI'), ('screentime', 'Dart');

INSERT INTO store_links (app_id, platform, url) VALUES
('screentime', 'windows', 'https://github.com/HarmanPreet-Singh-XYT/TimeMark-ScreenTimeApp/releases');

INSERT INTO system_requirements (app_id, category) VALUES
('screentime', 'Desktop App');
INSERT INTO system_requirement_details (requirement_id, name, value) VALUES
((SELECT id FROM system_requirements WHERE app_id = 'screentime' AND category = 'Desktop App'), 'OS', 'Windows 10/11, Ubuntu/Debian'),
((SELECT id FROM system_requirements WHERE app_id = 'screentime' AND category = 'Desktop App'), 'Processor', 'Dual Core CPU'),
((SELECT id FROM system_requirements WHERE app_id = 'screentime' AND category = 'Desktop App'), 'Memory', '1 GB RAM'),
((SELECT id FROM system_requirements WHERE app_id = 'screentime' AND category = 'Desktop App'), 'Storage', '100 MB available space');

INSERT INTO version_history (app_id, version, release_date) VALUES
('screentime', '1.0', '2024-03-26');
INSERT INTO version_changes (version_id, change_description) VALUES
((SELECT id FROM version_history WHERE app_id = 'screentime' AND version = '1.0'), 'Stable Release');

INSERT INTO permissions (app_id, permission) VALUES
('screentime', 'Uses all system resources'), ('screentime', 'App Tracking');

INSERT INTO faqs (app_id, question, answer) VALUES
('screentime', 'Who can use TimeMark?', 'Anyone who wants to track and manage their screen time, analyze app usage, and improve productivity can use TimeMark.'),
('screentime', 'Does TimeMark collect or store my data online?', 'No, all data is stored locally on your device. TimeMark does not send any data to servers or third parties.'),
('screentime', 'Can I set screen time limits for specific apps?', 'Yes, you can set daily usage limits for individual apps to manage your screen time effectively.'),
('screentime', 'Does TimeMark provide usage insights and analytics?', 'Yes, TimeMark offers detailed reports, graphs, and trends on your screen time, app usage, and focus sessions.'),
('screentime', 'Is there a focus mode or Pomodoro timer?', 'Yes, TimeMark includes a focus mode with a customizable Pomodoro timer to help you stay productive.'),
('screentime', 'Can I enable or disable tracking for specific apps?', 'Yes, you can choose which apps to track and hide or unhide them from reports.'),
('screentime', 'Does TimeMark work offline?', 'Yes, TimeMark works completely offline since all data is stored locally on your device.'),
('screentime', 'Is TimeMark free to use?', 'Yes, TimeMark is free to use with all core features available without any subscriptions or hidden costs.'),
('screentime', 'Can I reset or clear my data?', 'Yes, there is an option to reset settings or clear all stored data whenever you choose.');

INSERT INTO support_info (app_id, email, website, phone) VALUES
('screentime', 'harmanpreetsingh@programmer.net', NULL, NULL);

INSERT INTO additional_info (app_id, release_date, category, size, developer, publisher, version) VALUES
('screentime', '2024-03-26', 'Productivity Tools', '10.3 MB', 'Harmanpreet Singh', 'Harmanpreet Singh', '1.0');

INSERT INTO supported_languages (app_id, language) VALUES
('screentime', 'English');

INSERT INTO legal_links (app_id, privacy_policy, terms_of_service) VALUES
('screentime', '/timemark/privacy-policy', NULL);


--
-- Data for app: pingroute
--
INSERT INTO app_details (id, name, icon, is_private, header_image, trailer_url, description, demo_link, short_description, has_in_app_purchases) VALUES
('pingroute', 'PingRoute', '/pingroute/logo.png', FALSE, '/pingroute.jpeg', NULL, '', NULL, 'Provides real time network performance analysis and diagnostic tools for network troubleshooting.', FALSE);

INSERT INTO card_details (app_id, image, type, title, description) VALUES
('pingroute', '/pingroute.jpeg', 'development + design', 'PingRoute', 'PingRoute is a powerful network diagnostic tool that helps users monitor network performance in real-time. Whether you''re troubleshooting a connection issue or analyzing network traffic, PingRoute provides detailed insights into each hop on your network route.');

INSERT INTO card_tech (app_id, tech) VALUES
('pingroute', 'Dart'), ('pingroute', 'Flutter'), ('pingroute', 'Figma'), ('pingroute', 'Networking'), ('pingroute', 'C'), ('pingroute', 'Windows'), ('pingroute', 'Linux'), ('pingroute', 'Visualization'), ('pingroute', 'Microsoft Store');

INSERT INTO buttons_config (app_id, wishlist, share, demo) VALUES
('pingroute', FALSE, TRUE, FALSE);

INSERT INTO screenshots (app_id, url) VALUES
('pingroute', '/pingroute/1.PNG'), ('pingroute', '/pingroute/2.PNG'), ('pingroute', '/pingroute/3.PNG');

INSERT INTO tech_stack (app_id, technology) VALUES
('pingroute', 'Flutter'), ('pingroute', 'C'), ('pingroute', 'WinAPI'), ('pingroute', 'Dart');

INSERT INTO store_links (app_id, platform, url) VALUES
('pingroute', 'windows', 'https://apps.microsoft.com/detail/9mvqgxvmc883?hl=en-US&gl=US');

INSERT INTO reviews (id, app_id, user_name, rating, title, description, date) VALUES
('1xf2', 'pingroute', 'Manmeet Singh', 5, '', '', '2024-09-10');

INSERT INTO system_requirements (app_id, category) VALUES
('pingroute', 'Desktop App');
INSERT INTO system_requirement_details (requirement_id, name, value) VALUES
((SELECT id FROM system_requirements WHERE app_id = 'pingroute' AND category = 'Desktop App'), 'OS', 'Windows 10/11, Ubuntu/Debian'),
((SELECT id FROM system_requirements WHERE app_id = 'pingroute' AND category = 'Desktop App'), 'Processor', 'Dual Core CPU'),
((SELECT id FROM system_requirements WHERE app_id = 'pingroute' AND category = 'Desktop App'), 'Memory', '1 GB RAM'),
((SELECT id FROM system_requirements WHERE app_id = 'pingroute' AND category = 'Desktop App'), 'Storage', '100 MB available space');

INSERT INTO download_stats (app_id, total, last_month) VALUES
('pingroute', '100+', '22');

INSERT INTO version_history (app_id, version, release_date) VALUES
('pingroute', '1.0', '2024-09-10');
INSERT INTO version_changes (version_id, change_description) VALUES
((SELECT id FROM version_history WHERE app_id = 'pingroute' AND version = '1.0'), 'Stable Release');

INSERT INTO permissions (app_id, permission) VALUES
('pingroute', 'Uses all system resources'), ('pingroute', 'Access your Internet connection');

INSERT INTO faqs (app_id, question, answer) VALUES
('pingroute', 'Who can use it?', 'Anyone needing a network analysis of their network can use it to identify network problems.'),
('pingroute', 'What is it used for?', 'Primary objective is to get a real time network performance analysis with visual representation.'),
('pingroute', 'Does it provide individual hope data?', 'Yes, it does provide every hops data with multiple parameters graph representation.');

INSERT INTO support_info (app_id, email, website, phone) VALUES
('pingroute', 'harmanpreetsingh@programmer.net', NULL, NULL);

INSERT INTO additional_info (app_id, release_date, category, size, developer, publisher, version) VALUES
('pingroute', '2024-09-10', 'Network Tools', '29.8 MB', 'Harmanpreet Singh', 'Harmanpreet Singh', '1.0');

INSERT INTO supported_languages (app_id, language) VALUES
('pingroute', 'English');

INSERT INTO legal_links (app_id, privacy_policy, terms_of_service) VALUES
('pingroute', '/pingroute/privacypolicy', NULL);


--
-- Data for app: sysresource
--
INSERT INTO app_details (id, name, icon, is_private, header_image, trailer_url, description, demo_link, short_description, has_in_app_purchases) VALUES
('sysresource', 'SysResource', '/sysresource/logo.jpg', FALSE, '/sysresource.jpeg', NULL, '', 'https://sysresource.vercel.app/', 'Provides real time server analysis and report of the server resource utilization.', FALSE);

INSERT INTO card_details (app_id, image, type, title, description) VALUES
('sysresource', '/sysresource.jpeg', 'development + design', 'SysResource', 'SysResource is a real-time server resource monitoring tool that tracks CPU usage, memory utilization, and system uptime. It provides detailed metrics on server configurations like hostname, CPU cores, platform, and architecture, with real-time line charts for CPU and memory usage.');

INSERT INTO card_tech (app_id, tech) VALUES
('sysresource', 'React'), ('sysresource', 'Next.js'), ('sysresource', 'WebSockets'), ('sysresource', 'Server Administration'), ('sysresource', 'Node js'), ('sysresource', 'NPM Module');

INSERT INTO buttons_config (app_id, wishlist, share, demo) VALUES
('sysresource', FALSE, TRUE, TRUE);

INSERT INTO screenshots (app_id, url) VALUES
('sysresource', '/sysresource/sysresource.jpeg');

INSERT INTO tech_stack (app_id, technology) VALUES
('sysresource', 'Javascript'), ('sysresource', 'Typescript'), ('sysresource', 'Node.js'), ('sysresource', 'Express.js'), ('sysresource', 'Next.js'), ('sysresource', 'React'), ('sysresource', 'WebSocket');

INSERT INTO store_links (app_id, platform, url) VALUES
('sysresource', 'web', 'https://github.com/HarmanPreet-Singh-XYT/SysResource'),
('sysresource', 'server', 'https://github.com/HarmanPreet-Singh-XYT/node-sysresource');

INSERT INTO system_requirements (app_id, category) VALUES
('sysresource', 'Browser App'), ('sysresource', 'Server Side');
INSERT INTO system_requirement_details (requirement_id, name, value) VALUES
((SELECT id FROM system_requirements WHERE app_id = 'sysresource' AND category = 'Browser App'), 'Browser', 'Latest Chromium Based/Firefox'),
((SELECT id FROM system_requirements WHERE app_id = 'sysresource' AND category = 'Server Side'), 'RAM', '512 MB'),
((SELECT id FROM system_requirements WHERE app_id = 'sysresource' AND category = 'Server Side'), 'CPU', 'Single Core CPU'),
((SELECT id FROM system_requirements WHERE app_id = 'sysresource' AND category = 'Server Side'), 'Network Access', 'Required');

INSERT INTO version_history (app_id, version, release_date) VALUES
('sysresource', '1.0', '2024-10-13');
INSERT INTO version_changes (version_id, change_description) VALUES
((SELECT id FROM version_history WHERE app_id = 'sysresource' AND version = '1.0'), 'Stable Release');

INSERT INTO permissions (app_id, permission) VALUES
('sysresource', 'Uses all system resources'), ('sysresource', 'Access your Internet connection');

INSERT INTO faqs (app_id, question, answer) VALUES
('sysresource', 'Who can use it?', 'Anyone needing a server analysis can use it to keep track of system resources.'),
('sysresource', 'What is it used for?', 'Primary objective is to get a real time system performance analysis with visual representation.'),
('sysresource', 'Can you change data update interval?', 'Yes you can but for changing web socket interval you need to update the backend config files manually.'),
('sysresource', 'Does it support both API and WebSocket?', 'Yes, It does.');

INSERT INTO support_info (app_id, email, website, phone) VALUES
('sysresource', 'harmanpreetsingh@programmer.net', NULL, NULL);

INSERT INTO additional_info (app_id, release_date, category, size, developer, publisher, version) VALUES
('sysresource', '2024-10-13', 'Developer Tools', 'Browser/Server App', 'Harmanpreet Singh', 'Harmanpreet Singh', '1.0');

INSERT INTO supported_languages (app_id, language) VALUES
('sysresource', 'English');


--
-- Data for app: ecommerce
--
INSERT INTO app_details (id, name, icon, is_private, header_image, trailer_url, description, demo_link, short_description, has_in_app_purchases) VALUES
('ecommerce', 'Ecommerce Full Stack', '/ecommerce/logo.png', FALSE, '/ecommerce/3.png', NULL, '<h1>This is a full stack eCommerce website built using the PERN stack (PostgreSQL, Express, React, Node.js). It features a modern and responsive design, secure payment gateways, dynamic product display algorithms, and comprehensive user functionalities such as wishlist, reviews, order tracking, and more.</h1><h2>Features</h2><h3>eCommerce Features</h3><ul> <li><b>Categories & Subcategories:</b> Well-organized categories and subcategories for easy navigation.</li> <li><b>Products:</b> Detailed product pages with options for different sizes and colors.</li> <li><b>Payment Gateway:</b> Integrated with individual products and cart for secure transactions. (Stripe)</li> <li><b>Wishlist:</b> Option to save favorite products.</li> <li><b>Special Deals:</b> Exclusive deals displayed on the homepage.</li> <li><b>Banners:</b> Eye-catching banners to highlight promotions.</li> <li><b>Responsive Design:</b> Modern and mobile-friendly layout.</li> <li><b>Quantity Purchase:</b> Ability to purchase multiple quantities of a product.</li> <li><b>Homepage Algorithms:</b> Various algorithms to dynamically display products on the homepage.</li> <li><b>Filtering & Sorting:</b> Advanced filtering and sorting options on search and category pages.</li> <li><b>JWT Session:</b> Secure user sessions with JWT.</li> <li><b>Encrypted Passwords:</b> Enhanced security with password encryption.</li> <li><b>OAuth Support:</b> Easy registration and sign-in with OAuth.</li> <li><b>Payment on Delivery:</b> Option to pay upon delivery.</li> <li><b>Order Tracking:</b> Track orders with a detailed orders page.</li> <li><b>Order Summary:</b> Comprehensive order summary page.</li> <li><b>Custom Checkout:</b> Tailored checkout experience.</li> <li><b>Review System:</b> Post, delete, and edit reviews with a dedicated reviews page.</li> <li><b>Dynamic Routing:</b> Smooth navigation with dynamic routing.</li> <li><b>Product Quickview:</b> Quickly view product details and add to cart or go to the product page.</li> <li><b>Active Review & Rating Calculation:</b> Backend updates variables required for algorithms to work properly, actively calculates ratings & frontend required parameters.</li></ul><h3>Other Pages</h3><ul> <li><b>Category Specific Page:</b> Detailed pages for each category.</li> <li><b>Subcategory Page:</b> Dedicated pages for subcategories.</li> <li><b>Blog:</b> Informative blog section.</li> <li><b>Contact Page:</b> Easy-to-use contact form.</li> <li><b>Services Page:</b> Overview of offered services.</li> <li><b>About Us:</b> Information about the company.</li> <li><b>Privacy Policy:</b> Details on data privacy.</li> <li><b>Secure Payment Page:</b> Information on secure payment methods.</li> <li><b>Terms and Conditions:</b> Detailed terms and conditions.</li> <li><b>Refund and Cancellation Policy:</b> Policies on refunds and cancellations.</li></ul>', 'https://harman-ecommerce.vercel.app/', 'Ecommerce site with dynamic product display algorithms, secure payment gateways, user functionalities such as wishlist, reviews, order tracking, and more.', TRUE);

INSERT INTO card_details (app_id, image, type, title, description) VALUES
('ecommerce', '/ecommerce.jpeg', 'development + design', 'Ecommerce Full Stack', 'This is a full stack eCommerce website built using the PERN stack (PostgreSQL, Express, React, Node.js). It features a modern and responsive design, secure payment gateways, dynamic product display algorithms, and comprehensive user functionalities such as wishlist, reviews, order tracking, and more.');

INSERT INTO card_tech (app_id, tech) VALUES
('ecommerce', 'Docker'), ('ecommerce', 'Next.js'), ('ecommerce', 'Node.js'), ('ecommerce', 'Express'), ('ecommerce', 'PostgreSQL'), ('ecommerce', 'React'), ('ecommerce', 'Tailwind CSS'), ('ecommerce', 'Stripe'), ('ecommerce', 'Responsive'), ('ecommerce', 'Typescript');

INSERT INTO buttons_config (app_id, wishlist, share, demo) VALUES
('ecommerce', FALSE, TRUE, TRUE);

INSERT INTO screenshots (app_id, url) VALUES
('ecommerce', '/ecommerce/3.png'), ('ecommerce', '/ecommerce/2.png'), ('ecommerce', '/ecommerce/mobile.png');

INSERT INTO tech_stack (app_id, technology) VALUES
('ecommerce', 'Javascript'), ('ecommerce', 'Typescript'), ('ecommerce', 'Node.js'), ('ecommerce', 'Express.js'), ('ecommerce', 'Next.js'), ('ecommerce', 'React'), ('ecommerce', 'PostgreSQL'), ('ecommerce', 'Tailwind CSS'), ('ecommerce', 'Stripe'), ('ecommerce', 'Docker');

INSERT INTO store_links (app_id, platform, url) VALUES
('ecommerce', 'web', 'https://github.com/HarmanPreet-Singh-XYT/E-Commerce'),
('ecommerce', 'server', 'https://github.com/HarmanPreet-Singh-XYT/E-Commerce');

INSERT INTO system_requirements (app_id, category) VALUES
('ecommerce', 'Browser App'), ('ecommerce', 'Server Side');
INSERT INTO system_requirement_details (requirement_id, name, value) VALUES
((SELECT id FROM system_requirements WHERE app_id = 'ecommerce' AND category = 'Browser App'), 'Browser', 'Latest Chromium Based/Firefox'),
((SELECT id FROM system_requirements WHERE app_id = 'ecommerce' AND category = 'Server Side'), 'RAM', '1 GB'),
((SELECT id FROM system_requirements WHERE app_id = 'ecommerce' AND category = 'Server Side'), 'CPU', 'Single Core CPU'),
((SELECT id FROM system_requirements WHERE app_id = 'ecommerce' AND category = 'Server Side'), 'Network Access', 'Required');

INSERT INTO version_history (app_id, version, release_date) VALUES
('ecommerce', '1.1', '2024-08-15'), ('ecommerce', '1.0', '2024-08-13');
INSERT INTO version_changes (version_id, change_description) VALUES
((SELECT id FROM version_history WHERE app_id = 'ecommerce' AND version = '1.1'), 'Fix cart summary miscalculation'),
((SELECT id FROM version_history WHERE app_id = 'ecommerce' AND version = '1.0'), 'Stable Release'),
((SELECT id FROM version_history WHERE app_id = 'ecommerce' AND version = '1.0'), 'OAuth Login for native user');

INSERT INTO permissions (app_id, permission) VALUES
('ecommerce', 'Uses all system resources'), ('ecommerce', 'Access your Internet connection');

INSERT INTO faqs (app_id, question, answer) VALUES
('ecommerce', 'Does it have products for demo?', 'Yes, it does have products and different pages'),
('ecommerce', 'Does it have payment gateway?', 'Yes, it supports stripe payment gateway.'),
('ecommerce', 'Does it support authentication and account configuration?', 'Yes, it does.'),
('ecommerce', 'Can you change account settings and track orders?', 'Yes, you can.'),
('ecommerce', 'Can you fast deploy with docker?', 'Yes, you can except for DB.');

INSERT INTO support_info (app_id, email, website, phone) VALUES
('ecommerce', 'harmanpreetsingh@programmer.net', NULL, NULL);

INSERT INTO additional_info (app_id, release_date, category, size, developer, publisher, version) VALUES
('ecommerce', '2024-08-13', 'Developer Tools', 'Browser/Server App', 'Harmanpreet Singh', 'Harmanpreet Singh', '1.1');

INSERT INTO supported_languages (app_id, language) VALUES
('ecommerce', 'English');


--
-- Data for app: note-todo
--
INSERT INTO app_details (id, name, icon, is_private, header_image, trailer_url, description, demo_link, short_description, has_in_app_purchases) VALUES
('note-todo', 'Note Todo App', '/note-todo/logo.png', FALSE, '/note-todo/3.png', NULL, '', 'https://note-todo-app.vercel.app/', 'versatile task and note-taking web application, designed to help users organize their tasks, notes efficiently.', FALSE);

INSERT INTO card_details (app_id, image, type, title, description) VALUES
('note-todo', '/notetodo.png', 'development + design', 'Note Todo App', 'versatile task and note-taking web application, designed to help users organize their tasks, notes efficiently');

INSERT INTO card_tech (app_id, tech) VALUES
('note-todo', 'React'), ('note-todo', 'Next.js'), ('note-todo', 'Node.js'), ('note-todo', 'Express'), ('note-todo', 'MongoDB'), ('note-todo', 'SASS'), ('note-todo', 'Typescript');

INSERT INTO buttons_config (app_id, wishlist, share, demo) VALUES
('note-todo', FALSE, TRUE, TRUE);

INSERT INTO screenshots (app_id, url) VALUES
('note-todo', '/note-todo/1.png'), ('note-todo', '/note-todo/2.png'), ('note-todo', '/note-todo/3.png'), ('note-todo', '/note-todo/4.png'), ('note-todo', '/note-todo/5.png'), ('note-todo', '/note-todo/6.png'), ('note-todo', '/note-todo/8.png');

INSERT INTO tech_stack (app_id, technology) VALUES
('note-todo', 'React'), ('note-todo', 'Next.js'), ('note-todo', 'Node.js'), ('note-todo', 'Express'), ('note-todo', 'MongoDB'), ('note-todo', 'SASS'), ('note-todo', 'HTML/CSS');

INSERT INTO store_links (app_id, platform, url) VALUES
('note-todo', 'web', 'https://github.com/HarmanPreet-Singh-XYT/NoteTodo_MERN'),
('note-todo', 'server', 'https://github.com/HarmanPreet-Singh-XYT/NoteTodo_MERN');

INSERT INTO system_requirements (app_id, category) VALUES
('note-todo', 'Browser App'), ('note-todo', 'Server Side');
INSERT INTO system_requirement_details (requirement_id, name, value) VALUES
((SELECT id FROM system_requirements WHERE app_id = 'note-todo' AND category = 'Browser App'), 'Browser', 'Latest Chromium Based/Firefox'),
((SELECT id FROM system_requirements WHERE app_id = 'note-todo' AND category = 'Server Side'), 'RAM', '1 GB'),
((SELECT id FROM system_requirements WHERE app_id = 'note-todo' AND category = 'Server Side'), 'CPU', 'Single Core CPU'),
((SELECT id FROM system_requirements WHERE app_id = 'note-todo' AND category = 'Server Side'), 'Network Access', 'Required');

INSERT INTO version_history (app_id, version, release_date) VALUES
('note-todo', '1.1', '2023-11-07'), ('note-todo', '1.0', '2023-10-28');
INSERT INTO version_changes (version_id, change_description) VALUES
((SELECT id FROM version_history WHERE app_id = 'note-todo' AND version = '1.1'), 'Add Date & Time Selection/Todo & structure change'),
((SELECT id FROM version_history WHERE app_id = 'note-todo' AND version = '1.0'), 'Demo Release'),
((SELECT id FROM version_history WHERE app_id = 'note-todo' AND version = '1.0'), 'Optimize Backend');

INSERT INTO permissions (app_id, permission) VALUES
('note-todo', 'Uses all system resources'), ('note-todo', 'Access your Internet connection');

INSERT INTO faqs (app_id, question, answer) VALUES
('note-todo', 'Is it a full stack application?', 'Yes, it is full stack application.'),
('note-todo', 'How much time did it took to create?', 'It was my first full stack app, it took around a month or two.'),
('note-todo', 'Does it support authentication and account configuration?', 'Yes, it does.'),
('note-todo', 'Can you edit settings, todo, notes?', 'Yes, you can.');

INSERT INTO support_info (app_id, email, website, phone) VALUES
('note-todo', 'harmanpreetsingh@programmer.net', NULL, NULL);

INSERT INTO additional_info (app_id, release_date, category, size, developer, publisher, version) VALUES
('note-todo', '2023-10-28', 'Productivity Tools', 'Browser/Server App', 'Harmanpreet Singh', 'Harmanpreet Singh', '1.1');

INSERT INTO supported_languages (app_id, language) VALUES
('note-todo', 'English');

INSERT INTO app_details (id, name, icon, is_private, header_image, trailer_url, description, demo_link, short_description, has_in_app_purchases) VALUES
('native-ecommerce', 'Native Ecommerce App', '/native-ecommerce/logo.png', FALSE, '/ecommercemobile.jpeg', NULL, '', NULL, 'Ecommerce app with dynamic product display algorithms, secure payment gateways, user functionalities such as wishlist, reviews, order tracking, and more.', TRUE),
('percentage-value', 'PercentageValue App', '/percentage-value/logo.png', FALSE, '/percentageValue.PNG', NULL, 'Calculating app that gets the percentage value of a number, and do the reverse.', NULL, 'Developed a calculating app for a specific requirement for a friend in trading.', FALSE),
('answer-ai', 'Answer AI', '/answer-ai/logo.jpg', TRUE, '/answer-ai/2.PNG', 'https://www.youtube.com/watch?v=YKz6M5djf-M', '', NULL, 'AnswerAI is collection of native app, web extension, backend and frontend that provides answer of the question from chatGPT by reading question from website.', FALSE),
('raja-rumala-sahib', 'Raja Rumala Sahib (Business Site)', '/raja-rumala-sahib/logo.png', FALSE, '/businesssite.jpeg', NULL, 'Developed & Designed site for local business according to their needs to increase their reach. Implemented SEO practices, and setup Domain from purchasing domain to Deployment.', 'https://raja.rumala-sahib.com/', 'Showcases the work of a business.', FALSE),
('rust-game-store', 'Rust Game Store', '/rust-logo.png', FALSE, '/gamestore.jpeg', NULL, '', 'https://unicorn-rust.vercel.app/', 'Custom game site which allows purchase of in-game items via real money.', TRUE);

INSERT INTO card_details (app_id, image, type, title, description) VALUES
('native-ecommerce', '/ecommercereactnative.jpeg', 'development + design', 'Ecommerce Mobile App', 'Developed mobile version of Ecommerce site, using React Native. Implemented payment gateways, dynamic product display algorithms, and comprehensive user functionalities such as wishlist, reviews, order tracking, and more.'),
('percentage-value', '/percentageValue.PNG', 'development + design', 'PercentageValue Calculator', 'Developed a calculating app for a specific requirement for a friend in trading.'),
('answer-ai', '/answer-ai/3.PNG', 'development + design', 'AnswerAI', 'AnswerAI is collection of native app, web extension, backend and frontend that provides answer of the question from chatGPT by reading question from website.'),
('raja-rumala-sahib', '/businesssite.jpeg', 'development + design', 'Raja Rumala Sahib (Business Site)', 'Developed & Designed site for local business according to their needs to increase their reach. Implemented SEO practices, and setup Domain from purchasing domain to Deployment.'),
('rust-game-store', '/gamestore.jpeg', 'development + design', 'Unicorn Rust Game Store', 'The custom designed website for Rust Custom Game Server, Specifically for purchasing InGame items');

INSERT INTO card_tech (app_id, tech) VALUES
('native-ecommerce', 'Stripe'),
('native-ecommerce', 'React Native'),
('native-ecommerce', 'Figma'),
('native-ecommerce', 'React'),
('native-ecommerce', 'Typescript'),
('native-ecommerce', 'Node.js/Express'),
('native-ecommerce', 'PostgreSQL'),
('percentage-value', 'Flutter'),
('percentage-value', 'Figma'),
('percentage-value', 'Dart'),
('answer-ai', 'Flutter'),
('answer-ai', 'Dart'),
('answer-ai', 'React.js'),
('answer-ai', 'OpenAI ChatGPT'),
('answer-ai', 'WebScraping'),
('answer-ai', 'Node.js'),
('answer-ai', 'Express.js'),
('raja-rumala-sahib', 'Figma'),
('raja-rumala-sahib', 'Next.js'),
('raja-rumala-sahib', 'React'),
('rust-game-store', 'Figma'),
('rust-game-store', 'Next.js'),
('rust-game-store', 'Node.js'),
('rust-game-store', 'Express'),
('rust-game-store', 'PostgreSQL'),
('rust-game-store', 'React'),
('rust-game-store', 'Tailwind CSS'),
('rust-game-store', 'Responsive'),
('rust-game-store', 'Typescript');

INSERT INTO buttons_config (app_id, wishlist, share, demo) VALUES
('native-ecommerce', FALSE, TRUE, FALSE),
('percentage-value', FALSE, TRUE, FALSE),
('answer-ai', FALSE, TRUE, FALSE),
('raja-rumala-sahib', FALSE, TRUE, TRUE),
('rust-game-store', FALSE, TRUE, TRUE);

INSERT INTO screenshots (app_id, url, display_order) VALUES
('native-ecommerce', '/native-ecommerce/1.png', 0),
('native-ecommerce', '/native-ecommerce/2.jpeg', 1),
('native-ecommerce', '/native-ecommerce/3.jpeg', 2),
('percentage-value', '/percentage-value/1.PNG', 0),
('percentage-value', '/percentage-value/2.PNG', 1),
('percentage-value', '/percentage-value/3.PNG', 2),
('answer-ai', '/answer-ai/1.PNG', 0),
('answer-ai', '/answer-ai/3.PNG', 1),
('raja-rumala-sahib', '/raja-rumala-sahib/1.PNG', 0),
('raja-rumala-sahib', '/raja-rumala-sahib/2.PNG', 1),
('raja-rumala-sahib', '/raja-rumala-sahib/3.PNG', 2),
('rust-game-store', '/rust-game-store/1.PNG', 0),
('rust-game-store', '/rust-game-store/2.PNG', 1),
('rust-game-store', '/rust-game-store/3.PNG', 2);

INSERT INTO tech_stack (app_id, technology) VALUES
('native-ecommerce', 'Javascript'),
('native-ecommerce', 'Typescript'),
('native-ecommerce', 'Node.js'),
('native-ecommerce', 'Express.js'),
('native-ecommerce', 'React Native'),
('native-ecommerce', 'PostgreSQL'),
('native-ecommerce', 'Tailwind CSS'),
('native-ecommerce', 'Stripe'),
('native-ecommerce', 'React'),
('percentage-value', 'Flutter'),
('percentage-value', 'Dart'),
('answer-ai', 'Flutter'),
('answer-ai', 'Dart'),
('answer-ai', 'React.js'),
('answer-ai', 'OpenAI ChatGPT'),
('answer-ai', 'WebScraping'),
('answer-ai', 'Node.js'),
('answer-ai', 'Express.js'),
('raja-rumala-sahib', 'Javascript'),
('raja-rumala-sahib', 'Typescript'),
('raja-rumala-sahib', 'Next.js'),
('raja-rumala-sahib', 'React'),
('rust-game-store', 'Javascript'),
('rust-game-store', 'Next.js'),
('rust-game-store', 'React'),
('rust-game-store', 'Node.js'),
('rust-game-store', 'Express'),
('rust-game-store', 'MongoDB'),
('rust-game-store', 'SCSS');

INSERT INTO store_links (app_id, platform, url) VALUES
('native-ecommerce', 'android', 'https://github.com/HarmanPreet-Singh-XYT/ECommerce-React-Native/releases'),
('native-ecommerce', 'server', 'https://github.com/HarmanPreet-Singh-XYT/E-Commerce'),
('percentage-value', 'windows', 'https://github.com/HarmanPreet-Singh-XYT/PercentageValue/releases');

-- No reviews provided in the JSON data.

INSERT INTO system_requirements (app_id, category) VALUES
('native-ecommerce', 'Mobile'),
('native-ecommerce', 'Server Side'),
('percentage-value', 'Desktop'),
('answer-ai', 'Mobile'),
('answer-ai', 'Desktop'),
('answer-ai', 'Server Side'),
('raja-rumala-sahib', 'Browser App'),
('rust-game-store', 'Browser App');

INSERT INTO system_requirement_details (requirement_id, name, value) VALUES
((SELECT id FROM system_requirements WHERE app_id = 'native-ecommerce' AND category = 'Mobile'), 'OS', 'Android 7+'),
((SELECT id FROM system_requirements WHERE app_id = 'native-ecommerce' AND category = 'Mobile'), 'RAM', '2 GB'),
((SELECT id FROM system_requirements WHERE app_id = 'native-ecommerce' AND category = 'Mobile'), 'CPU', 'Dual Core'),
((SELECT id FROM system_requirements WHERE app_id = 'native-ecommerce' AND category = 'Mobile'), 'Storage', '512 MB'),
((SELECT id FROM system_requirements WHERE app_id = 'native-ecommerce' AND category = 'Server Side'), 'RAM', '1 GB'),
((SELECT id FROM system_requirements WHERE app_id = 'native-ecommerce' AND category = 'Server Side'), 'CPU', 'Single Core CPU'),
((SELECT id FROM system_requirements WHERE app_id = 'native-ecommerce' AND category = 'Server Side'), 'Network Access', 'Required'),
((SELECT id FROM system_requirements WHERE app_id = 'percentage-value' AND category = 'Desktop'), 'OS', 'Windows/Linux/MacOS'),
((SELECT id FROM system_requirements WHERE app_id = 'percentage-value' AND category = 'Desktop'), 'RAM', '2 GB'),
((SELECT id FROM system_requirements WHERE app_id = 'percentage-value' AND category = 'Desktop'), 'CPU', 'Dual Core'),
((SELECT id FROM system_requirements WHERE app_id = 'percentage-value' AND category = 'Desktop'), 'Storage', '512 MB'),
((SELECT id FROM system_requirements WHERE app_id = 'answer-ai' AND category = 'Mobile'), 'OS', 'Android 7+'),
((SELECT id FROM system_requirements WHERE app_id = 'answer-ai' AND category = 'Mobile'), 'RAM', '2 GB'),
((SELECT id FROM system_requirements WHERE app_id = 'answer-ai' AND category = 'Mobile'), 'CPU', 'Dual Core'),
((SELECT id FROM system_requirements WHERE app_id = 'answer-ai' AND category = 'Mobile'), 'Storage', '512 MB'),
((SELECT id FROM system_requirements WHERE app_id = 'answer-ai' AND category = 'Desktop'), 'OS', 'Windows, Linux, macOS'),
((SELECT id FROM system_requirements WHERE app_id = 'answer-ai' AND category = 'Desktop'), 'RAM', '2 GB'),
((SELECT id FROM system_requirements WHERE app_id = 'answer-ai' AND category = 'Desktop'), 'CPU', 'Dual Core'),
((SELECT id FROM system_requirements WHERE app_id = 'answer-ai' AND category = 'Desktop'), 'Storage', '512 MB'),
((SELECT id FROM system_requirements WHERE app_id = 'answer-ai' AND category = 'Server Side'), 'RAM', '1 GB'),
((SELECT id FROM system_requirements WHERE app_id = 'answer-ai' AND category = 'Server Side'), 'CPU', 'Single Core CPU'),
((SELECT id FROM system_requirements WHERE app_id = 'answer-ai' AND category = 'Server Side'), 'Network Access', 'Required'),
((SELECT id FROM system_requirements WHERE app_id = 'raja-rumala-sahib' AND category = 'Browser App'), 'Browser', 'Latest Chromium Based/Firefox'),
((SELECT id FROM system_requirements WHERE app_id = 'rust-game-store' AND category = 'Browser App'), 'Browser', 'Latest Chromium Based/Firefox');

-- No developers provided in the JSON data.
-- No download stats provided in the JSON data.

INSERT INTO version_history (app_id, version, release_date) VALUES
('native-ecommerce', '1.3', '2024-08-16'),
('native-ecommerce', '1.2', '2024-08-15'),
('native-ecommerce', '1.1', '2024-08-15'),
('native-ecommerce', '1.0', '2024-08-15'),
('percentage-value', '1.1', '2025-03-02'),
('percentage-value', '1.0', '2024-09-12'),
('answer-ai', '1.0', '2025-01-04'),
('raja-rumala-sahib', '1.0', '2024-09-25'),
('rust-game-store', '1.0', '2023-12-30');

INSERT INTO version_changes (version_id, change_description, display_order) VALUES
((SELECT id FROM version_history WHERE app_id = 'native-ecommerce' AND version = '1.3'), 'Locked Orientation for better user experience.', 0),
((SELECT id FROM version_history WHERE app_id = 'native-ecommerce' AND version = '1.2'), 'Fixed Bugs', 0),
((SELECT id FROM version_history WHERE app_id = 'native-ecommerce' AND version = '1.1'), 'Fixed Bugs & Added Clipboard for Gift cards, Coupons.', 0),
((SELECT id FROM version_history WHERE app_id = 'native-ecommerce' AND version = '1.0'), 'Stable Release', 0),
((SELECT id FROM version_history WHERE app_id = 'percentage-value' AND version = '1.1'), 'add reverse mode', 0),
((SELECT id FROM version_history WHERE app_id = 'percentage-value' AND version = '1.1'), 'update UI', 1),
((SELECT id FROM version_history WHERE app_id = 'percentage-value' AND version = '1.0'), 'stable release', 0),
((SELECT id FROM version_history WHERE app_id = 'answer-ai' AND version = '1.0'), 'Stable Release', 0),
((SELECT id FROM version_history WHERE app_id = 'raja-rumala-sahib' AND version = '1.0'), 'Stable Release', 0),
((SELECT id FROM version_history WHERE app_id = 'rust-game-store' AND version = '1.0'), 'Deployment', 0);

INSERT INTO permissions (app_id, permission) VALUES
('native-ecommerce', 'Uses all system resources'),
('native-ecommerce', 'Access your Internet connection'),
('percentage-value', 'Uses all system resources'),
('answer-ai', 'Uses all system resources'),
('answer-ai', 'Access your Internet connection'),
('raja-rumala-sahib', 'Access your Internet connection'),
('rust-game-store', 'Access your Internet connection');

INSERT INTO faqs (app_id, question, answer, display_order) VALUES
('native-ecommerce', 'Does it have products for demo?', 'Yes, it does have products and different pages', 0),
('native-ecommerce', 'Does it have payment gateway?', 'Yes, it supports stripe payment gateway.', 1),
('native-ecommerce', 'Does it support authentication and account configuration?', 'Yes, it does.', 2),
('native-ecommerce', 'Can you change account settings and track orders?', 'Yes, you can.', 3),
('native-ecommerce', 'Can you fast deploy with docker?', 'Yes, you can except for DB.', 4),
('percentage-value', 'What is the main purpose of this app?', 'To get percentage value of any value, or do it in reverse.', 0),
('answer-ai', 'Does it have any demo?', 'Yes, the video is available above.', 0),
('answer-ai', 'Why code is not available?', 'The product was developed for a specific reason and revealing the code may cause issues.', 1),
('answer-ai', 'Whats the architectural flow?', 'The browser extension picks the question automatically and sends it to the backend, then the backend requests ChatGPT for answer and then stores the answer in the memory which is then displayed on the app which keeps checking every 5 second for new content.', 2),
('answer-ai', 'What was the main purpose of it?', 'To solve quizes, tests easily using AI.', 3),
('raja-rumala-sahib', 'What does it do?', 'Website showcases the work of a local business.', 0),
('raja-rumala-sahib', 'What is the main purpose?', 'To get clients via showcasing work online.', 1),
('raja-rumala-sahib', 'Does it have SEO Implementations?', 'Yes, it does have SEO strategies.', 2),
('raja-rumala-sahib', 'Does it have custom domain and where it is hosted?', 'Yes, it does and is hosted on vercel.', 3),
('rust-game-store', 'What does it do?', 'Website showcases the skins and in-game items of rust.', 0),
('rust-game-store', 'What is the main purpose?', 'To allow users to purchase in-game items through website with real money.', 1),
('rust-game-store', 'Does it have custom domain and where it is hosted?', 'No, it does and is hosted on vercel.', 2);

INSERT INTO support_info (app_id, email, website, phone) VALUES
('native-ecommerce', 'harmanpreetsingh@programmer.net', NULL, NULL),
('percentage-value', 'harmanpreetsingh@programmer.net', NULL, NULL),
('answer-ai', 'harmanpreetsingh@programmer.net', NULL, NULL),
('raja-rumala-sahib', 'harmanpreetsingh@programmer.net', NULL, NULL),
('rust-game-store', 'harmanpreetsingh@programmer.net', NULL, NULL);

INSERT INTO additional_info (app_id, release_date, category, size, developer, publisher, version) VALUES
('native-ecommerce', '2024-08-15', 'ECommerce', '66.9 MB', 'Harmanpreet Singh', 'Harmanpreet Singh', '1.3'),
('percentage-value', '2024-09-12', 'Productivity Tools', '9.67 MB', 'Harmanpreet Singh', 'Harmanpreet Singh', '1.1'),
('answer-ai', '2024-08-15', 'Artificial Intelligence', 'N/A', 'Harmanpreet Singh', 'Harmanpreet Singh', '1.0'),
('raja-rumala-sahib', '2024-09-25', 'Business', 'Browser App', 'Harmanpreet Singh', 'Harmanpreet Singh', '1.0'),
('rust-game-store', '2024-09-25', 'Gaming', 'Browser/Server App', 'Harmanpreet Singh', 'Harmanpreet Singh', '1.0');

INSERT INTO supported_languages (app_id, language) VALUES
('native-ecommerce', 'English'),
('percentage-value', 'English'),
('answer-ai', 'English'),
('raja-rumala-sahib', 'English'),
('rust-game-store', 'English');