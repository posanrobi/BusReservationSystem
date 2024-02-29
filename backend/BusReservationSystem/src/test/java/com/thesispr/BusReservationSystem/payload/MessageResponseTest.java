package com.thesispr.BusReservationSystem.payload;

import com.thesispr.BusReservationSystem.payload.response.MessageResponse;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Unit tests for the MessageResponse class.
 */
public class MessageResponseTest {

    /**
     * Test to verify the getters and setters of the MessageResponse class.
     */
    @Test
    public void testGettersSetters() {
        /* Arrange: Create a MessageResponse object */
        MessageResponse messageResponse = new MessageResponse("");

        /* Define test data */
        String testMessage = "Test message";

        /* Act: Set message using setter method */
        messageResponse.setMessage(testMessage);

        /* Assert: Verify that the getter returns the expected message */
        assertEquals(testMessage, messageResponse.getMessage());
    }
}
