-- +goose Up
-- +goose StatementBegin

-- Create custom type for platform
CREATE TYPE platform_type AS ENUM ('windows', 'android', 'ios', 'web', 'linux', 'macos', 'server');

-- Main application details table
CREATE TABLE app_details (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    icon VARCHAR(500),
    is_private BOOLEAN DEFAULT FALSE,
    header_image VARCHAR(500),
    trailer_url VARCHAR(500),
    description TEXT,
    demo_link VARCHAR(500),
    short_description TEXT,
    has_in_app_purchases BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Card details (embedded in app_details)
CREATE TABLE card_details (
    app_id VARCHAR(255) PRIMARY KEY,
    image VARCHAR(500),
    type VARCHAR(100),
    title VARCHAR(255),
    description TEXT,
    FOREIGN KEY (app_id) REFERENCES app_details(id) ON DELETE CASCADE
);

-- Card tech stack (many-to-many)
CREATE TABLE card_tech (
    id SERIAL PRIMARY KEY,
    app_id VARCHAR(255),
    tech VARCHAR(100),
    FOREIGN KEY (app_id) REFERENCES app_details(id) ON DELETE CASCADE
);

-- Buttons configuration
CREATE TABLE buttons_config (
    app_id VARCHAR(255) PRIMARY KEY,
    wishlist BOOLEAN DEFAULT FALSE,
    share BOOLEAN DEFAULT FALSE,
    demo BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (app_id) REFERENCES app_details(id) ON DELETE CASCADE
);

-- Screenshots
CREATE TABLE screenshots (
    id SERIAL PRIMARY KEY,
    app_id VARCHAR(255),
    url VARCHAR(500),
    display_order INT DEFAULT 0,
    FOREIGN KEY (app_id) REFERENCES app_details(id) ON DELETE CASCADE
);

-- Tech stack
CREATE TABLE tech_stack (
    id SERIAL PRIMARY KEY,
    app_id VARCHAR(255),
    technology VARCHAR(100),
    FOREIGN KEY (app_id) REFERENCES app_details(id) ON DELETE CASCADE
);

-- Store links
CREATE TABLE store_links (
    id SERIAL PRIMARY KEY,
    app_id VARCHAR(255),
    platform platform_type,
    url VARCHAR(500),
    FOREIGN KEY (app_id) REFERENCES app_details(id) ON DELETE CASCADE
);

-- Reviews
CREATE TABLE reviews (
    id VARCHAR(255) PRIMARY KEY,
    app_id VARCHAR(255),
    user_name VARCHAR(255),
    rating INT CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    description TEXT,
    date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (app_id) REFERENCES app_details(id) ON DELETE CASCADE
);

-- System requirements categories
CREATE TABLE system_requirements (
    id SERIAL PRIMARY KEY,
    app_id VARCHAR(255),
    category VARCHAR(100),
    FOREIGN KEY (app_id) REFERENCES app_details(id) ON DELETE CASCADE
);

-- System requirement details
CREATE TABLE system_requirement_details (
    id SERIAL PRIMARY KEY,
    requirement_id INT,
    name VARCHAR(255),
    value VARCHAR(500),
    FOREIGN KEY (requirement_id) REFERENCES system_requirements(id) ON DELETE CASCADE
);

-- Developers
CREATE TABLE developers (
    id SERIAL PRIMARY KEY,
    app_id VARCHAR(255),
    name VARCHAR(255),
    role VARCHAR(100),
    avatar VARCHAR(500),
    bio TEXT,
    FOREIGN KEY (app_id) REFERENCES app_details(id) ON DELETE CASCADE
);

-- Download statistics
CREATE TABLE download_stats (
    app_id VARCHAR(255) PRIMARY KEY,
    total VARCHAR(50),
    last_month VARCHAR(50),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (app_id) REFERENCES app_details(id) ON DELETE CASCADE
);

-- Version history
CREATE TABLE version_history (
    id SERIAL PRIMARY KEY,
    app_id VARCHAR(255),
    version VARCHAR(50),
    release_date DATE,
    FOREIGN KEY (app_id) REFERENCES app_details(id) ON DELETE CASCADE
);

-- Version changes
CREATE TABLE version_changes (
    id SERIAL PRIMARY KEY,
    version_id INT,
    change_description TEXT,
    display_order INT DEFAULT 0,
    FOREIGN KEY (version_id) REFERENCES version_history(id) ON DELETE CASCADE
);

-- Permissions
CREATE TABLE permissions (
    id SERIAL PRIMARY KEY,
    app_id VARCHAR(255),
    permission VARCHAR(255),
    FOREIGN KEY (app_id) REFERENCES app_details(id) ON DELETE CASCADE
);

-- FAQs
CREATE TABLE faqs (
    id SERIAL PRIMARY KEY,
    app_id VARCHAR(255),
    question TEXT,
    answer TEXT,
    display_order INT DEFAULT 0,
    FOREIGN KEY (app_id) REFERENCES app_details(id) ON DELETE CASCADE
);

-- Support information
CREATE TABLE support_info (
    app_id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255),
    website VARCHAR(500),
    phone VARCHAR(50),
    FOREIGN KEY (app_id) REFERENCES app_details(id) ON DELETE CASCADE
);

-- Additional information
CREATE TABLE additional_info (
    app_id VARCHAR(255) PRIMARY KEY,
    release_date DATE,
    category VARCHAR(100),
    size VARCHAR(50),
    developer VARCHAR(255),
    publisher VARCHAR(255),
    version VARCHAR(50),
    FOREIGN KEY (app_id) REFERENCES app_details(id) ON DELETE CASCADE
);

-- Supported languages
CREATE TABLE supported_languages (
    id SERIAL PRIMARY KEY,
    app_id VARCHAR(255),
    language VARCHAR(50),
    FOREIGN KEY (app_id) REFERENCES app_details(id) ON DELETE CASCADE
);

-- Legal links
CREATE TABLE legal_links (
    app_id VARCHAR(255) PRIMARY KEY,
    privacy_policy VARCHAR(500),
    terms_of_service VARCHAR(500),
    FOREIGN KEY (app_id) REFERENCES app_details(id) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX idx_app_name ON app_details(name);
CREATE INDEX idx_app_private ON app_details(is_private);
CREATE INDEX idx_app_tech ON card_tech(app_id);
CREATE INDEX idx_app_screenshots ON screenshots(app_id);
CREATE INDEX idx_app_tech_stack ON tech_stack(app_id);
CREATE INDEX idx_app_store_links ON store_links(app_id);
CREATE INDEX idx_app_reviews ON reviews(app_id);
CREATE INDEX idx_review_date ON reviews(date);
CREATE INDEX idx_review_rating ON reviews(rating);
CREATE INDEX idx_app_sys_req ON system_requirements(app_id);
CREATE INDEX idx_requirement_details ON system_requirement_details(requirement_id);
CREATE INDEX idx_app_developers ON developers(app_id);
CREATE INDEX idx_app_versions ON version_history(app_id);
CREATE INDEX idx_version_date ON version_history(release_date);
CREATE INDEX idx_version_changes ON version_changes(version_id);
CREATE INDEX idx_app_permissions ON permissions(app_id);
CREATE INDEX idx_app_faqs ON faqs(app_id);
CREATE INDEX idx_app_languages ON supported_languages(app_id);

-- Create function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_app_details_updated_at BEFORE UPDATE ON app_details
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_download_stats_updated_at BEFORE UPDATE ON download_stats
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin

-- Drop all triggers
DROP TRIGGER IF EXISTS update_app_details_updated_at ON app_details;
DROP TRIGGER IF EXISTS update_download_stats_updated_at ON download_stats;

-- Drop function
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Drop all tables in reverse order of creation
DROP TABLE IF EXISTS legal_links CASCADE;
DROP TABLE IF EXISTS supported_languages CASCADE;
DROP TABLE IF EXISTS additional_info CASCADE;
DROP TABLE IF EXISTS support_info CASCADE;
DROP TABLE IF EXISTS faqs CASCADE;
DROP TABLE IF EXISTS permissions CASCADE;
DROP TABLE IF EXISTS version_changes CASCADE;
DROP TABLE IF EXISTS version_history CASCADE;
DROP TABLE IF EXISTS download_stats CASCADE;
DROP TABLE IF EXISTS developers CASCADE;
DROP TABLE IF EXISTS system_requirement_details CASCADE;
DROP TABLE IF EXISTS system_requirements CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS store_links CASCADE;
DROP TABLE IF EXISTS tech_stack CASCADE;
DROP TABLE IF EXISTS screenshots CASCADE;
DROP TABLE IF EXISTS buttons_config CASCADE;
DROP TABLE IF EXISTS card_tech CASCADE;
DROP TABLE IF EXISTS card_details CASCADE;
DROP TABLE IF EXISTS app_details CASCADE;

-- Drop custom type
DROP TYPE IF EXISTS platform_type;

-- +goose StatementEnd