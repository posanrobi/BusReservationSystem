package com.thesispr.BusReservationSystem;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

public class UpdatePasswordRequestTest {

    @Test
    void testEmptyConstructor() {
        UpdatePasswordRequest request = new UpdatePasswordRequest();

        assertNull(request.getCurrentPassword());
        assertNull(request.getNewPassword());
        assertNull(request.getConfirmPassword());
    }

    @Test
    void testConstructorWithCurrentAndNewPassword() {
        String currentPassword = "oldPassword";
        String newPassword = "newPassword";
        UpdatePasswordRequest request = new UpdatePasswordRequest(currentPassword, newPassword);

        assertEquals(currentPassword, request.getCurrentPassword());
        assertEquals(newPassword, request.getNewPassword());
        assertNull(request.getConfirmPassword());
    }

    @Test
    void testFullConstructor() {
        String currentPassword = "oldPassword";
        String newPassword = "newPassword";
        String confirmPassword = "newPassword";
        UpdatePasswordRequest request = new UpdatePasswordRequest(currentPassword, newPassword, confirmPassword);

        assertEquals(currentPassword, request.getCurrentPassword());
        assertEquals(newPassword, request.getNewPassword());
        assertEquals(confirmPassword, request.getConfirmPassword());
    }

    @Test
    void testGettersAndSetters() {
        UpdatePasswordRequest request = new UpdatePasswordRequest();

        String currentPassword = "oldPassword";
        String newPassword = "newPassword";
        String confirmPassword = "newPassword";

        request.setCurrentPassword(currentPassword);
        request.setNewPassword(newPassword);
        request.setConfirmPassword(confirmPassword);

        assertEquals(currentPassword, request.getCurrentPassword());
        assertEquals(newPassword, request.getNewPassword());
        assertEquals(confirmPassword, request.getConfirmPassword());
    }
}
