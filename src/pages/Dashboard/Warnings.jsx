import React from "react";
import Card from "@/components/Card";
import Col from "@/components/Col";

import Dropdown from "@/components/Dropdown";
import { FileWarning } from "lucide-react";

const Warnings = () => {
  return (
    <Col variant="full">
      <Card>
        <Card.Body>
          <div className="flex items-center justify-center gap-x-8">
            <span className="flex flex-col items-center justify-center p-4">
              <span className="text-lg font-extrabold">!</span> Düşük Stok{" "}
            </span>
            <span className="flex flex-col items-center justify-center p-4">
              <span className="text-lg font-extrabold">!</span> Fazla Maliyet{" "}
            </span>
            <span className="flex flex-col items-center justify-center p-4">
              <span className="text-lg font-extrabold">!</span> Eksik Reçete{" "}
            </span>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Warnings;
