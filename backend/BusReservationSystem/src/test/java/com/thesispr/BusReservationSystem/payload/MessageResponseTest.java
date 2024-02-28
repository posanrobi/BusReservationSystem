package com.thesispr.BusReservationSystem.payload;

import com.thesispr.BusReservationSystem.payload.response.MessageResponse;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class MessageResponseTest {
    @Test
    public void testGettersSetters() {
        MessageResponse messageResponse = new MessageResponse("");

        String testMessage = "Test message";

        messageResponse.setMessage(testMessage);

        assertEquals(testMessage, messageResponse.getMessage());
    }
}
