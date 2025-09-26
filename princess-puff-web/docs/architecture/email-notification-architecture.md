# Email & Notification Architecture

## Email Template Design

**Technology:** React Email for component-based email templates with Resend API
**Approach:** Luxury-branded HTML emails matching the Luxe Noir aesthetic

## Template Components

```typescript
// emails/components/LuxuryLayout.tsx
export const LuxuryLayout = ({ children, preview }: EmailLayoutProps) => (
  <Html>
    <Head />
    <Preview>{preview}</Preview>
    <Body style={{ backgroundColor: '#000000', fontFamily: 'Georgia, serif' }}>
      <Container style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Section style={{ padding: '40px 20px' }}>
          <Img 
            src="https://princesspuff.rs/logo-email.png"
            width="200"
            height="80"
            alt="Princess Puff"
            style={{ margin: '0 auto 30px' }}
          />
          {children}
        </Section>
      </Container>
    </Body>
  </Html>
);

// emails/ContactInquiry.tsx
export const ContactInquiry = ({ name, email, message, type }: ContactEmailProps) => (
  <LuxuryLayout preview={`New ${type} inquiry from ${name}`}>
    <Heading style={{ 
      color: '#D4A574',
      fontSize: '24px',
      fontWeight: 'normal',
      textAlign: 'center'
    }}>
      New {type === 'b2b' ? 'Business' : 'Customer'} Inquiry
    </Heading>
    <Section style={{ 
      backgroundColor: '#1a1a1a',
      padding: '30px',
      borderRadius: '8px',
      border: '1px solid #D4A574'
    }}>
      <Text style={{ color: '#ffffff', margin: '0 0 20px' }}>
        <strong style={{ color: '#D4A574' }}>From:</strong> {name}
      </Text>
      <Text style={{ color: '#ffffff', margin: '0 0 20px' }}>
        <strong style={{ color: '#D4A574' }}>Email:</strong> {email}
      </Text>
      <Text style={{ color: '#ffffff', margin: '0' }}>
        <strong style={{ color: '#D4A574' }}>Message:</strong>
      </Text>
      <Text style={{ color: '#cccccc', lineHeight: '1.6' }}>
        {message}
      </Text>
    </Section>
  </LuxuryLayout>
);
```

## Email Service Implementation

```typescript
// lib/email/service.ts
import { Resend } from 'resend';
import { ContactInquiry } from '@/emails/ContactInquiry';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(data: ContactFormData) {
  const { name, email, message, type } = data;
  
  try {
    await resend.emails.send({
      from: 'Princess Puff <noreply@princesspuff.rs>',
      to: type === 'b2b' ? process.env.B2B_EMAIL! : process.env.B2C_EMAIL!,
      subject: `New ${type === 'b2b' ? 'Business' : 'Customer'} Inquiry - ${name}`,
      react: ContactInquiry({ name, email, message, type }),
      headers: {
        'X-Priority': '1',
        'X-Entity-Ref-ID': crypto.randomUUID()
      }
    });
    
    return { success: true };
  } catch (error) {
    logger.error('Email send failed', error);
    throw new APIError(500, 'EMAIL_SEND_FAILED', 'Failed to send email');
  }
}
```

## Email Configuration

**Domain Setup:**
- SPF record: `v=spf1 include:amazonses.com ~all`
- DKIM: Configured via Resend dashboard
- DMARC: `v=DMARC1; p=quarantine; rua=mailto:dmarc@princesspuff.rs`

**Email Types:**
1. **Contact Form Submissions** (B2C and B2B)
2. **Order Confirmations** (Phase 2)
3. **Newsletter** (Phase 2)
