function formatDuration(date1, date2) {
  const ms = Math.abs(new Date(date2) - new Date(date1));

  const ONE_SECOND = 1000;
  const ONE_MINUTE = 60 * 1000;
  const ONE_HOUR = 60 * 60 * 1000;

  if (ms < ONE_SECOND) {
    return `${ms}ms`;
  }

  if (ms < ONE_MINUTE) {
    const seconds = ms / ONE_SECOND;
    return `${parseFloat(seconds.toFixed(1))}s`;
  }

  if (ms < ONE_HOUR) {
    const minutes = ms / ONE_MINUTE;
    return `${parseFloat(minutes.toFixed(1))}m`;
  }

  const hours = ms / ONE_HOUR;
  return `${parseFloat(hours.toFixed(2))}h`;
}

module.exports = {
  formatDuration,
};
