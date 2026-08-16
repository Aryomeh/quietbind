export type AdNetwork = "admob" | "monetag";

interface RewardedAdResult {
  network: AdNetwork;
}

/**
 * Placeholder for a single ad network's rewarded-ad SDK call. Each
 * network's real zone/app ID plugs in here later — swapping AdMob or
 * Monetag from placeholder to the real SDK is a change inside this
 * function only, not to the waterfall or call sites below.
 * Placeholders always "succeed" after durationMs.
 */
function loadPlaceholderAd(network: AdNetwork, durationMs: number): Promise<RewardedAdResult> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ network }), durationMs);
  });
}

/**
 * Waterfall: try AdMob first, fall back to Monetag if AdMob fails to
 * load/fill. Both are placeholders for now (always succeed), so only
 * the AdMob branch runs in dev today — the Monetag fallback branch
 * starts exercising itself automatically once the real AdMob SDK is
 * wired in and can actually throw/reject on no-fill.
 */
export async function runRewardedAdWaterfall(durationMs: number): Promise<AdNetwork> {
  try {
    const result = await loadPlaceholderAd("admob", durationMs);
    return result.network;
  } catch {
    const result = await loadPlaceholderAd("monetag", durationMs);
    return result.network;
  }
}
