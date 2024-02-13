package com.thesispr.BusReservationSystem;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 * Servlet initializer class for deploying the application as a WAR file.
 */
public class ServletInitializer extends SpringBootServletInitializer {

	/**
	 * Configures the application.
	 *
	 * @param application the SpringApplicationBuilder object.
	 * @return the configured SpringApplicationBuilder object.
	 */
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(BusReservationSystemApplication.class);
	}

}
