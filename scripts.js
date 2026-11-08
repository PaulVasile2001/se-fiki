async function loadTranscript(filePath, transcriptList) {
  if (!transcriptList) return;

  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error("Transcript could not be loaded.");

    const transcript = await response.text();
    transcriptList.replaceChildren();

    for (const line of transcript.split(/\r?\n/)) {
      const separator = line.indexOf(":");
      if (separator === -1) continue;

      const listItem = document.createElement("li");
      const speaker = document.createElement("strong");
      speaker.textContent = line.slice(0, separator).trim() + ": ";
      listItem.append(speaker, document.createTextNode(line.slice(separator + 1).trim()));
      transcriptList.append(listItem);
    }
  } catch {
    const errorItem = document.createElement("li");
    errorItem.textContent = "Transcript unavailable. Open this page through a local web server to load the text file.";
    transcriptList.replaceChildren(errorItem);
  }
}

loadTranscript(
  "interviews/Transcript%20Interviu%20Victor.txt",
  document.getElementById("victor-transcript")
);

loadTranscript(
  "interviews/Transcript%20Interviu%20Teodor.txt",
  document.getElementById("teodor-transcript")
);