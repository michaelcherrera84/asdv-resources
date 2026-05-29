import { Html, Body, Container, Heading, Text, Button } from "@react-email/components";

interface EmailTemplateProps {
    username: string;
    link: string;
}

/**
 * Email template component.
 */
export function EmailTemplate({ username, link }: EmailTemplateProps) {
    return (
        <Html>
            <Body
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                    padding: "20px",
                }}
            >
                <h1 style={{ fontSize: "2rem", fontWeight: "900", color: "#003D78" }}>ASDV Resources</h1>
                <Container style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}>
                    <div style={{ padding: "30px 50px" }}>
                        <Heading style={{ fontSize: "1.5rem" }}>Hi {username},</Heading>
                        <Text style={{ fontSize: "1rem", padding: "30px 0 50px" }}>
                            Your ASDV Resources password can be reset by clicking the button below. If you did not
                            request a new password, please ignore this email.
                        </Text>
                        <div style={{ textAlign: "center" }}>
                            <Button
                                href={link}
                                style={{
                                    background: "#003D78",
                                    color: "white",
                                    padding: "10px 20px",
                                    borderRadius: "5px",
                                    fontWeight: "bold",
                                }}
                            >
                                Reset Password
                            </Button>
                        </div>
                        <hr style={{ margin: "50px 0", color: "#ccc" }} />
                        <Text style={{ fontSize: "1rem", color: "#666" }}>
                            Need Help?&nbsp;&nbsp;
                            <a
                                href="https://discord.com/invite/E6dn2kt2cg"
                                style={{ color: "#155dfc", textDecoration: "underline" }}
                            >
                                Contact us on Discord
                            </a>
                        </Text>
                    </div>
                </Container>
                <Text style={{ textAlign: "center" }}>
                    Sent by{" "}
                    <a href="https://asdv-resources.vercel.app" style={{ textDecoration: "underline" }}>
                        ASDV Resources
                    </a>
                    .
                </Text>
            </Body>
        </Html>
    );
}
