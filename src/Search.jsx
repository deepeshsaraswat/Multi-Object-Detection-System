import React, { useEffect, useState } from 'react';
import wikipedia from 'wikipedia';
import './index.css';

const Search = ({ pred }) => {
  const [uniqueClasses, setUniqueClasses] = useState([]);
  const [summaries, setSummaries] = useState([]);
  const [showResults, setShowResults] = useState(false); // State to manage visibility of results

  useEffect(() => {
    const fetchObjectSummaries = async () => {
      if (!pred || pred.length === 0) {
        // Reset state when pred is undefined or empty
        setUniqueClasses([]);
        setSummaries([]);
        setShowResults(false);
        return;
      }

      try {
        // Get unique classes from predictions
        const uniqueClassesSet = new Set(pred.map(prediction => prediction.class));
        const uniqueClassesArray = [...uniqueClassesSet];
        setUniqueClasses(uniqueClassesArray);

        // Fetch summaries for each unique class
        const promises = uniqueClassesArray.map(async (className) => {
          try {
            const page = await wikipedia.page(className);
            const summary = await page.summary();
            return { class: className, summary: summary };
          } catch (error) {
            console.error(`Error fetching summary for ${className}:`, error);
            return { class: className, summary: { extract: 'No summary available' } }; // Provide fallback
          }
        });

        const fetchedSummaries = await Promise.all(promises);
        setSummaries(fetchedSummaries);
        setShowResults(true); // Show results once summaries are fetched
      } catch (error) {
        console.error('Error fetching object summaries:', error);
      }
    };

    fetchObjectSummaries(); // Trigger fetch on mount and whenever pred changes
  }, [pred]);

  // Calculate counts of each category
  const categoryCounts = {};
  if (pred && pred.length > 0) {
    pred.forEach(prediction => {
      if (categoryCounts[prediction.class]) {
        categoryCounts[prediction.class]++;
      } else {
        categoryCounts[prediction.class] = 1;
      }
    });
  } else {
    // Handle case where pred is empty or undefined
    console.warn('No predictions available.');
  }

  return (
    <div className="summary-container">
      {showResults && (
        <div className="summary-box">
          {pred && pred.length > 0 && (
            <>
              <h1>Object Summaries</h1>
              <h4>Object Count by Category:</h4>
              <div>
                {Object.keys(categoryCounts).map((category, index) => (
                  <li key={index}>
                    {category}: {categoryCounts[category]}
                  </li>
                ))}
              </div>
              <hr />
            </>
          )}

          {/* Conditionally render summary box based on showResults state */}
          <div className="summary-box flip">
            {summaries.length === 0 ? (
              <p>Loading...</p>
            ) : (
              uniqueClasses.map((className, index) => {
                const summary = summaries.find(item => item.class === className);
                // Safely check if summary exists before trying to access its properties
                return summary ? (
                  <div key={index} className="summary-item">
                    <h2>{className.toUpperCase()}</h2>
                    <p>{summary.summary.extract}</p>
                    <br />
                  </div>
                ) : (
                  <div key={index} className="summary-item">
                    <h2>{className.toUpperCase()}</h2>
                    <p>No summary available</p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Message when no image is uploaded or processing */}
      {!showResults && (
        <p>Please upload an image.</p>
      )}
    </div>
  );
};

export default Search;
