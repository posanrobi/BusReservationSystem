package com.thesispr.BusReservationSystem;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

/**
 * Unit tests for the UpdatePasswordRequest class.
 */
public class UpdatePasswordRequestTest {

    /**
     * Test the empty constructor of UpdatePasswordRequest.
     */
    @Test
    void testEmptyConstructor() {
        /* Arrange: Create an instance of UpdatePasswordRequest using the empty constructor */
        UpdatePasswordRequest request = new UpdatePasswordRequest();

        /* Act & Assert: Access the currentPassword, newPassword, and confirmPassword fields and
        * Verify that currentPassword and newPassword are set correctly, and confirmPassword is null */
        assertNull(request.getCurrentPassword());
        assertNull(request.getNewPassword());
        assertNull(request.getConfirmPassword());
    }

    /**
     * Test the constructor of UpdatePasswordRequest with current and new password.
     */
    @Test
    void testConstructorWithCurrentAndNewPassword() {
        /* Arrange: Create an instance of UpdatePasswordRequest with current and new passwords */
        String currentPassword = "oldPassword";
        String newPassword = "newPassword";

        /* Act: Access the currentPassword, newPassword, and confirmPassword fields */
        UpdatePasswordRequest request = new UpdatePasswordRequest(currentPassword, newPassword);

        /* Assert: Verify that currentPassword and newPassword are set correctly, and confirmPassword is null */
        assertEquals(currentPassword, request.getCurrentPassword());
        assertEquals(newPassword, request.getNewPassword());
        assertNull(request.getConfirmPassword());
    }

    /**
     * Test the full constructor of UpdatePasswordRequest.
     */
    @Test
    void testFullConstructor() {
        /* Arrange: Create an instance of UpdatePasswordRequest with current */
        String currentPassword = "oldPassword";
        String newPassword = "newPassword";
        String confirmPassword = "newPassword";

        /* Act: Access the currentPassword, newPassword, and confirmPassword fields */
        UpdatePasswordRequest request = new UpdatePasswordRequest(currentPassword, newPassword, confirmPassword);

        /* Assert: Verify that all fields are set correctly */
        assertEquals(currentPassword, request.getCurrentPassword());
        assertEquals(newPassword, request.getNewPassword());
        assertEquals(confirmPassword, request.getConfirmPassword());
    }

    /**
     * Test the getters and setters of UpdatePasswordRequest.
     */
    @Test
    void testGettersAndSetters() {
        /* Arrange: Create an instance of UpdatePasswordRequest and set passwords */
        UpdatePasswordRequest request = new UpdatePasswordRequest();
        String currentPassword = "oldPassword";
        String newPassword = "newPassword";
        String confirmPassword = "newPassword";

        /* Act: Set values using setters and retrieve using getters */
        request.setCurrentPassword(currentPassword);
        request.setNewPassword(newPassword);
        request.setConfirmPassword(confirmPassword);

        /* Assert: Verify that values are set and retrieved correctly */
        assertEquals(currentPassword, request.getCurrentPassword());
        assertEquals(newPassword, request.getNewPassword());
        assertEquals(confirmPassword, request.getConfirmPassword());
    }
}
