SOURCE=./
EXCLUDE_FILE=rsync-exclude.txt

.PHONY: deploy

deploy:
	@if [ ! -f .env ]; then \
		echo "ERROR: .env file not found! Please create it with USER, HOST, and DEST variables."; \
		exit 1; \
	fi
	@echo "Loading configuration from .env..."
	. .env; \

	@echo "Starting rsync deployment to $(HOST)..."
	. .env; rsync -avz \
		--exclude-from='$(EXCLUDE_FILE)' \
		--delete \
		'$(SOURCE)' \
		'$(USER)@$(HOST):$(DEST)';
	
	@echo "Attempting to reload Nginx on $(HOST)..."
	. .env; ssh $(USER)@$(HOST) 'sudo systemctl reload nginx'
	
	@echo "Deployment and Nginx reload complete!"

.PHONY: clean
clean:
	@echo "No clean actions defined for this project."