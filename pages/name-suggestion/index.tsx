import { useState, useEffect } from "react";
import Link from "next/link";
import { HomeIcon, HeartIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import {
  addBoyRecommendation,
  updateBoyVoteCount,
  listenBoyRecommendations,
} from "../../firebase/boyService";
import type { nameRecommendation } from "@/types/nameRecommendation";
import styles from "../../styles/NameSuggestion.module.css";

const LS_PREFIX = "boy-vote-";

const NameSuggestionPage = () => {
  const [name, setName] = useState("");
  const [givenBy, setGivenBy] = useState("");
  const [recommendations, setRecommendations] = useState<nameRecommendation[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [votedNames, setVotedNames] = useState<Set<string>>(new Set());
  const [votingName, setVotingName] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const voted = new Set<string>();
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(LS_PREFIX)) {
        voted.add(key.slice(LS_PREFIX.length));
      }
    });
    setVotedNames(voted);
  }, []);

  useEffect(() => {
    const unsubscribe = listenBoyRecommendations((names) => {
      setRecommendations(names);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter a name");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await addBoyRecommendation(name.trim(), givenBy.trim());
      setSuccess(`"${name.trim()}" has been suggested! 🎉`);
      setName("");
      setGivenBy("");
      setTimeout(() => setSuccess(""), 4000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleVote = async (recName: string, currentCount: number) => {
    if (votedNames.has(recName) || votingName === recName) return;
    setVotingName(recName);
    try {
      localStorage.setItem(`${LS_PREFIX}${recName}`, "true");
      setVotedNames((prev) => { const next = new Set(Array.from(prev)); next.add(recName); return next; });
      await updateBoyVoteCount(recName, currentCount + 1);
    } finally {
      setVotingName(null);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Floating background bubbles */}
      <div className={styles.bubblesContainer} aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className={`${styles.bubble} ${
              styles[`bubble${i + 1}` as keyof typeof styles]
            }`}
          />
        ))}
      </div>

      {/* Twinkling stars */}
      <div className={styles.starsContainer} aria-hidden="true">
        {Array.from({ length: 8 }, (_, i) => (
          <span
            key={i}
            className={`${styles.star} ${
              styles[`star${i + 1}` as keyof typeof styles]
            }`}
          >
            ✦
          </span>
        ))}
      </div>

      {/* Nav */}
      <nav className={styles.nav}>
        <Link href="/" className={styles.homeLink}>
          <HomeIcon className={styles.homeIcon} />
          <span>Home</span>
        </Link>
      </nav>

      {/* Hero Header */}
      <header className={styles.header}>
        <div className={styles.babyEmoji}>👶🏻</div>
        <h1 className={styles.title}>Name our Baby Boy</h1>
        <p className={styles.subtitle}>
          Suggest or vote for names starting with{" "}
          <span className={styles.allowedLetters}>द</span> or{" "}
          <span className={styles.allowedLetters}>च</span>
        </p>
      </header>

      <main className={styles.main}>
        {/* Suggestion Form */}
        <section className={styles.card}>
          <h2 className={styles.cardTitle}>✨ Suggest a Name</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              placeholder="Baby's name (starting with द or च)"
              className={styles.input}
              dir="auto"
              autoComplete="off"
            />
            <input
              type="text"
              value={givenBy}
              onChange={(e) => setGivenBy(e.target.value)}
              placeholder="Your name (optional)"
              className={styles.input}
              autoComplete="off"
            />
            {error && <p className={styles.errorText}>{error}</p>}
            {success && <p className={styles.successText}>{success}</p>}
            <button
              type="submit"
              className={`${styles.submitButton} ${
                submitting ? styles.submitting : ""
              }`}
              disabled={submitting}
            >
              {submitting ? "Submitting…" : "Submit Suggestion"}
            </button>
          </form>
        </section>

        {/* Voting Section */}
        <section className={styles.card}>
          <h2 className={styles.cardTitle}>💙 Vote for Names</h2>

          {loading ? (
            <div className={styles.loadingDots}>
              <div className={styles.dot} />
              <div className={styles.dot} />
              <div className={styles.dot} />
            </div>
          ) : recommendations.length === 0 ? (
            <p className={styles.emptyText}>
              No suggestions yet — be the first to suggest a name!
            </p>
          ) : (
            <div className={styles.namesList}>
              {recommendations.map((rec, index) => {
                const hasVoted = votedNames.has(rec.name);
                const isVoting = votingName === rec.name;
                const rankClass =
                  index === 0
                    ? styles.rank1
                    : index === 1
                    ? styles.rank2
                    : index === 2
                    ? styles.rank3
                    : "";

                return (
                  <div
                    key={rec.name}
                    className={`${styles.nameCard} ${rankClass} ${
                      styles[`delay${index % 5}` as keyof typeof styles]
                    }`}
                  >
                    <div className={styles.nameInfo}>
                      <span className={styles.nameBadge}>{index + 1}</span>
                      <div className={styles.nameDetails}>
                        <p className={styles.nameText}>{rec.name}</p>
                        {rec.givenBy && (
                          <p className={styles.givenByText}>
                            suggested by {rec.givenBy}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className={styles.voteSection}>
                      <span className={styles.voteCount}>{rec.voteCount}</span>
                      <button
                        onClick={() => handleVote(rec.name, rec.voteCount)}
                        disabled={hasVoted || isVoting}
                        className={`${styles.voteButton} ${
                          hasVoted ? styles.voted : ""
                        }`}
                        title={
                          hasVoted
                            ? "You already voted for this name"
                            : "Vote for this name"
                        }
                        aria-label={
                          hasVoted
                            ? `Voted for ${rec.name}`
                            : `Vote for ${rec.name}`
                        }
                      >
                        {hasVoted ? (
                          <CheckCircleIcon className={styles.voteIcon} />
                        ) : (
                          <HeartIcon className={styles.voteIcon} />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default NameSuggestionPage;
