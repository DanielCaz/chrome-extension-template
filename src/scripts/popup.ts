const btn = document.querySelector<HTMLButtonElement>("button");

btn?.addEventListener("click", async () => {
  try {
    await chrome.scripting.executeScript({
      target: { tabId: await getTabId() },
      func: async () => main(),
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return;
    }

    console.error("Unknown error");
  }
});

function getTabId() {
  const queryOptions = { active: true, currentWindow: true };

  return new Promise<number>((resolve) => {
    chrome.tabs.query(queryOptions, (tabs) => resolve(tabs[0]?.id || 0));
  });
}
