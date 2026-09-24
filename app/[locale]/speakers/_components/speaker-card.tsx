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
        <Flex direction="column" gap="3">
          {speaker.sessions.map((session) => (
            <Link key={session.id} href={`/sessions/${session.id}`}>
              <Flex direction="column" _hover={{ textDecoration: "underline" }}>
                <Text fontSize="sm" color="var(--text-muted)">
                  {session.startTime}
                </Text>
                <Text color="var(--text-primary)">{session.title}</Text>
              </Flex>
            </Link>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
