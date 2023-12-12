import React, { useState, useEffect } from 'react';
import { Tree } from 'react-d3-tree';
import { useParams } from 'react-router-dom';

const EmployeeTree = () => {
  const [treeData, setTreeData] = useState();
  const { employeeID } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:9000/getdata/${employeeID}`);
        const data = await response.json();

        if (response.ok) {
          // Create the node structure for the current company
          const currentCompanyNode = {
            name: data.companyName,
            attributes: {
              type: 'Company',
            },
            children: [],
          };

          // Map employees to job titles
          const jobTitleMap = new Map();
          data.data.forEach((employee) => {
            const jobTitle = employee.jobTitle;
            if (!jobTitleMap.has(jobTitle)) {
              jobTitleMap.set(jobTitle, []);
            }
            jobTitleMap.get(jobTitle).push({
              firstName: employee.firstName,
              lastName: employee.lastName,
            });
          });

          // Add job title nodes to the current company node
          jobTitleMap.forEach((employees, jobTitle) => {
            const jobTitleNode = {
              name: jobTitle,
              attributes: {
                type: 'JobTitle',
              },
              children: employees.map((employee) => ({
                name: `${employee.firstName} ${employee.lastName}`,
                attributes: {
                  type: 'EmployeeName',
                },
              })),
            };
            currentCompanyNode.children.push(jobTitleNode);
          });
          // If there's a parentCompany, make it the top node
          const transformedData = data.parentCompany
            ? {
              name: data.parentCompany,
              attributes: {
                type: 'Parent',
              },
              children: [currentCompanyNode],
            }
            : currentCompanyNode;

          // // If there's a descendant, add it as a child of the current company
          // if (data.descendantCompanies) {
          //   currentCompanyNode.children.push({
          //     name: data.descendantCompanies,
          //     attributes: {
          //       type: 'Descendant',
          //     },
          //     children: [], // If you have more detailed data, you can construct a subtree here
          //   });
          // }
          setTreeData(transformedData);
        } else {
          console.error('Error fetching employee data:', data.message);
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    };

    if (employeeID) {
      fetchData();
    }
  }, [employeeID]);

  const config = {
    translate: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    orientation: 'vertical',
  };

  // Define custom node shapes for different types
  const nodeShapes = {
    Company: {
      shape: 'rect',
      shapeProps: {
        width: 120,
        height: 40,
        x: -60,
        y: -20,
      },
    },
    JobTitle: {
      shape: 'circle',
      shapeProps: {
        r: 20,
      },
    },
    EmployeeName: {
      shape: 'ellipse',
      shapeProps: {
        rx: 40,
        ry: 20,
      },
      textLayout: {
        textAnchor: 'middle',
        style: {
          dominantBaseline: 'middle', // This aligns the text vertically in the middle
        },
      },
    },
  };

  // Function to handle node click
  const handleNodeClick = (nodeData, event) => {
    console.log('Clicked Node:', nodeData);
    event.stopPropagation();
  };

  return (
    <div id="treeWrapper" style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {treeData && (
        <Tree
          data={treeData}
          zoomable={true}
          translate={config.translate}
          orientation={config.orientation}
          nodeSvgShape={nodeShapes}
          onClickNode={handleNodeClick}
        />
      )}
    </div>
  );
};

export default EmployeeTree;
