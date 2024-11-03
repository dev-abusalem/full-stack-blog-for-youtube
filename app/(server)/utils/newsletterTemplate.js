export const newsletterTemplate = (email) => `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    <h2 style="color: #4CAF50; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">New Message from Contact Form</h2>
    
    <p style="font-size: 16px; line-height: 1.5;">
      <span style="font-weight: bold; color: #555;">Email:</span> <a href="mailto:${email}" style="color: #4CAF50; text-decoration: none;">${email}</a>
    </p>
    
 
    
    <p style="font-size: 14px; color: #999; margin-top: 30px;">
      This message was sent from pressifyx.com website's contact form.
    </p>
  </div>
`;
