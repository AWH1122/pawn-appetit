import { Badge, Group, Text } from "@mantine/core";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { hidePuzzleRatingAtom, maxPlayerRatingAtom, playerRatingAtom } from "@/state/atoms";
import { logger } from "@/utils/logger";
import type { Puzzle } from "@/utils/puzzles";
import { PUZZLE_DEBUG_LOGS } from "@/utils/puzzles";

interface PuzzleStatisticsProps {
  currentPuzzle?: Puzzle;
}

export const PuzzleStatistics = ({ currentPuzzle }: PuzzleStatisticsProps) => {
  const { t } = useTranslation();
  const [hideRating] = useAtom(hidePuzzleRatingAtom);
  const [playerRating] = useAtom(playerRatingAtom);
  const [maxPlayerRating, setMaxPlayerRating] = useAtom(maxPlayerRatingAtom);
  const [showNewMax, setShowNewMax] = useState(false);

  const displayRating = currentPuzzle?.completion === "incomplete" && hideRating ? "?" : currentPuzzle?.rating;

  // Check for new max rating
  useEffect(() => {
    if (playerRating > maxPlayerRating) {
      PUZZLE_DEBUG_LOGS &&
        logger.debug("New max rating achieved:", {
          oldMax: Math.round(maxPlayerRating),
          newMax: Math.round(playerRating),
          improvement: Math.round(playerRating - maxPlayerRating),
        });
      setMaxPlayerRating(playerRating);
      setShowNewMax(true);
      setTimeout(() => setShowNewMax(false), 5000);
    }
  }, [playerRating, maxPlayerRating, setMaxPlayerRating]);

  return (
    <Group justify="space-between">
      <div>
        <Text size="sm" c="dimmed">
          {t("Puzzle.Rating")}
        </Text>
        <Text fw={500} size="xl">
          {displayRating ? displayRating : "?"}
        </Text>
      </div>
      <div>
        <Text size="sm" c="dimmed">
          {t("Puzzle.PlayerRating")}
        </Text>
        <Group gap="xs" align="center">
          <Text fw={500} size="xl">
            {playerRating.toFixed(0)}
          </Text>
          {showNewMax && (
            <Badge color="green" variant="filled" size="sm">
              {t("Puzzle.NewMax")}!
            </Badge>
          )}
        </Group>
      </div>
      <div>
        <Text size="sm" c="dimmed">
          {t("Puzzle.MaxRating")}
        </Text>
        <Text fw={500} size="xl">
          {maxPlayerRating.toFixed(0)}
        </Text>
      </div>
    </Group>
  );
};
