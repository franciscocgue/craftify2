export const emailHtml = (authUrl: string) => `
<div style="font-family: Arial, sans-serif; color: #333; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
    <p style="font-size: 18px; font-weight: bold; color: #444;">Hey there! 👋</p>

    <p style="font-size: 16px; line-height: 1.5;">
        Did you just request access to <strong>Craftify</strong>? Click the button below to continue:
    </p>

    <p style="text-align: center; margin: 20px 0;">
        <a href="${authUrl}" target="_blank" style="display: inline-block; padding: 12px 24px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">
            Confirm Access
        </a>
    </p>

    <p style="font-size: 14px; color: #666;">
        If you didn’t request this, you can safely ignore this email.
    </p>

    <p style="font-size: 14px; font-weight: bold; margin-top: 20px;">Thank you,</p>
    <p style="font-size: 14px; color: #007bff;">The Craftify Team</p>
</div>
`