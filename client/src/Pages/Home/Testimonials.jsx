import React, { useState } from 'react';
import { testimonialList } from '../apicall';
import { useQuery } from '@tanstack/react-query'; // Import Use Query

const Testimonials = () => {
  const [visibleCards, setVisibleCards] = useState(3);

  const getData = async () => {
    const response = await testimonialList();
    return response;
  };

  const { data: testdata } = useQuery({
    queryKey: ['testdata'],
    queryFn: getData,
  });

  const handleLoadMore = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 3);
  };

  console.log('My test...', testdata);

  return (
    <>
      {/* Testimonials Section */}
      <section
        style={{
          backgroundColor: '#f9f9f9',
          padding: '50px 0',
          fontFamily: 'Arial, sans-serif',
        }}
        id="features"
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>
          {/* Section Heading */}
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '10px' }}>
              Read our <em style={{ color: '#007bff' }}>Testimonials</em>
            </h2>
            <img
              src="/assets/images/line-dec.png"
              alt="waves"
              style={{ display: 'block', margin: '10px auto', maxWidth: '150px' }}
            />
          </div>

          {/* Testimonials List */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            <ul style={{ listStyle: 'none', padding: 0, width: '100%' }}>
              {Array.isArray(testdata) &&
                testdata
                  ?.slice(0, testdata.length)
                  .reverse()
                  .slice(0, visibleCards)
                  .map((value, index) => {
                    return (
                      <li
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          background: '#fff',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                          borderRadius: '10px',
                          padding: '20px',
                          marginBottom: '20px',
                          maxWidth: '800px',
                          margin: '10px auto',
                        }}
                      >
                        <div style={{ marginRight: '20px' }}>
                          <img
                            src={`${process.env.REACT_APP_BASE_URL}${value?.image}`}
                            alt={value?.title}
                            style={{
                              height: '100px',
                              width: '100px',
                              borderRadius: '50%',
                              objectFit: 'cover',
                              border: '3px solid #007bff',
                            }}
                          />
                        </div>
                        <div>
                          <h4 style={{ fontSize: '1.5rem', color: '#333', marginBottom: '10px' }}>
                            {value?.title}
                          </h4>
                          <p
                            style={{ fontSize: '1rem', color: '#555', lineHeight: '1.6' }}
                            dangerouslySetInnerHTML={{ __html: value?.message }}
                          ></p>
                        </div>
                      </li>
                    );
                  })}
            </ul>
          </div>

          {/* Load More Button */}
          {visibleCards < (Array.isArray(testdata) && testdata.length) ? (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button
                onClick={handleLoadMore}
                style={{
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 20px',
                  fontSize: '1rem',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
              >
                Load More
              </button>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default Testimonials;
