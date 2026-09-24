import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { SpeakerWithSessions } from "@/utils/speakers";
import { Flex, Text } from "@chakra-ui/react";

interface SpeakerCardProps {
  speaker: SpeakerWithSessions;
}

export function SpeakerCard({ speaker }: SpeakerCardProps) {
  return (
    <Card height="full">
      <CardHeader>
        <CardTitle fontSize="md">{speaker.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Flex as="ul" direction="column" gap="1" listStyleType="none">
          {speaker.sessions.map((session) => (
            <li key={session.id}>
              <Link href={`/sessions/${session.id}`}>
                <Flex
                  direction="column"
                  paddingY="2"
                  _hover={{ textDecoration: "underline" }}
                >
                  <Text fontSize="sm" color="var(--text-secondary)">
                    {session.startTime}
                  </Text>
                  <Text color="var(--text-primary)">{session.title}</Text>
                </Flex>
              </Link>
            </li>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
