package com.thesispr.BusReservationSystem;

/**
 * Represents a request object used for updating a user's password.
 */
public class UpdatePasswordRequest {
    private String currentPassword;
    private String newPassword;
    private String confirmPassword;

    /**
     * Constructs an empty UpdatePasswordRequest object.
     */
    public UpdatePasswordRequest() {
    }

    /**
     * Constructs an UpdatePasswordRequest object with the current password and new password.
     *
     * @param currentPassword the current password
     * @param newPassword     the new password
     */
    public UpdatePasswordRequest(String currentPassword, String newPassword) {
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
    }

    /**
     * Constructs an UpdatePasswordRequest object with the current password, new password, and confirm password.
     *
     * @param currentPassword the current password
     * @param newPassword     the new password
     * @param confirmPassword the confirmation of the new password
     */
    public UpdatePasswordRequest(String currentPassword, String newPassword, String confirmPassword) {
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
        this.confirmPassword = confirmPassword;
    }

    /**
     * Retrieves the current password.
     *
     * @return the current password
     */
    public String getCurrentPassword() {
        return currentPassword;
    }

    /**
     * Sets the current password.
     *
     * @param currentPassword the current password to set
     */
    public void setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
    }

    /**
     * Retrieves the new password.
     *
     * @return the new password
     */
    public String getNewPassword() {
        return newPassword;
    }

    /**
     * Sets the new password.
     *
     * @param newPassword the new password to set
     */
    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    /**
     * Retrieves the confirmation of the new password.
     *
     * @return the confirmation of the new password
     */
    public String getConfirmPassword() {
        return confirmPassword;
    }

    /**
     * Sets the confirmation of the new password.
     *
     * @param confirmPassword the confirmation of the new password to set
     */
    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
}
